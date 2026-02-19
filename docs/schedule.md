---
title: Scheduler
---

# Scheduler

Raiden includes a built-in job scheduler powered by [gocron](https://github.com/go-co-op/gocron). Jobs run on a schedule defined by a duration and support lifecycle hooks, tracing, and Pub/Sub integration.

## Enabling the Scheduler

Set `SCHEDULE_STATUS` to `on` in your configuration:

```yaml
# configs/app.yaml
SCHEDULE_STATUS: "on"
```

When disabled (default: `off`), registered jobs will not run.

## Defining a Job

Create job files in the `internal/jobs/` directory. A job implements the `Job` interface by embedding `raiden.JobBase` and overriding the methods you need.

::: code-group

```go [internal/jobs/hello.go]
package jobs

import (
	"fmt"
	"time"

	"github.com/go-co-op/gocron/v2"
	"github.com/google/uuid"
	"github.com/sev-2/raiden"
)

type HelloWorldJob struct {
	raiden.JobBase
}

func (j *HelloWorldJob) Name() string {
	return "hello_world_job"
}

func (j *HelloWorldJob) Duration() gocron.JobDefinition {
	return gocron.DurationJob(5 * time.Minute)
}

func (j *HelloWorldJob) Task(ctx raiden.JobContext) error {
	fmt.Printf("Hello at %s\n", time.Now().String())
	return nil
}

// Optional lifecycle hooks

func (j *HelloWorldJob) Before(ctx raiden.JobContext, jobID uuid.UUID, jobName string) {
	raiden.Info("before execute", "name", jobName)
}

func (j *HelloWorldJob) After(ctx raiden.JobContext, jobID uuid.UUID, jobName string) {
	raiden.Info("after execute", "name", jobName)
}

func (j *HelloWorldJob) AfterErr(ctx raiden.JobContext, jobID uuid.UUID, jobName string, err error) {
	raiden.Error("after execute with error", "message", err.Error())
}
```

:::

## Job Interface

| Method         | Required | Description                                      |
|----------------|----------|--------------------------------------------------|
| `Name()`       | Yes      | Unique name identifying the job                   |
| `Duration()`   | Yes      | Schedule definition (how often to run)            |
| `Task(ctx)`    | Yes      | The main work to execute                          |
| `Before(ctx, jobID, jobName)` | No | Called before the task runs         |
| `After(ctx, jobID, jobName)`  | No | Called after the task completes successfully |
| `AfterErr(ctx, jobID, jobName, err)` | No | Called when the task returns an error |

`JobBase` provides no-op defaults for all methods. You only need to override `Name()`, `Duration()`, and `Task()`.

## Duration Types

The `Duration()` method returns a `gocron.JobDefinition`. Common options from the gocron library:

```go
// Run every N duration
gocron.DurationJob(30 * time.Minute)

// Run on a cron schedule
gocron.CronJob("*/5 * * * *", false) // every 5 minutes

// Run once at a specific time
gocron.OneTimeJob(gocron.OneTimeJobStartDateTime(time.Date(2025, 1, 1, 0, 0, 0, 0, time.UTC)))

// Run daily at a specific time
gocron.DailyJob(1, gocron.NewAtTimes(gocron.NewAtTime(8, 0, 0)))

// Run weekly
gocron.WeeklyJob(1, gocron.NewWeekdays(time.Monday, time.Friday), gocron.NewAtTimes(gocron.NewAtTime(9, 0, 0)))
```

## JobContext

The `JobContext` provides access to configuration, data storage, and integration features:

| Method                    | Description                                         |
|---------------------------|-----------------------------------------------------|
| `Config()`                | Access the application `*Config`                    |
| `Get(key)`               | Retrieve a value from the job's data store          |
| `Set(key, value)`        | Store a value in the job's data store               |
| `IsDataExist(key)`       | Check if a key exists in the data store             |
| `RunJob(params)`         | Trigger another job from within a job               |
| `Publish(ctx, provider, topic, message)` | Publish a message via Pub/Sub  |
| `Span()`                 | Get the current OpenTelemetry span                  |
| `SetSpan(span)`          | Set the tracing span                                |

### Running Another Job

You can trigger another job from within a job using `RunJob`:

```go
func (j *MainJob) Task(ctx raiden.JobContext) error {
	// ... do work ...

	// Trigger a follow-up job
	ctx.RunJob(raiden.JobParams{
		Job:  &FollowUpJob{},
		Data: raiden.JobData{"key": "value"},
	})

	return nil
}
```

## Registering Jobs

Jobs are registered with the server in your bootstrap code:

::: code-group

```go [internal/bootstrap/jobs.go]
package bootstrap

import (
	"github.com/sev-2/raiden"
	"app/internal/jobs"
)

func RegisterJobs(server *raiden.Server) {
	server.RegisterJobs(
		&jobs.HelloWorldJob{},
	)
}
```

:::

Then call it from your main entry point:

```go [cmd/app/main.go]
func main() {
	config, err := raiden.LoadConfig(nil)
	if err != nil {
		raiden.Error("load configuration", err.Error())
	}

	server := raiden.NewServer(config)

	bootstrap.RegisterRoute(server)
	bootstrap.RegisterJobs(server) // [!code highlight]

	server.Run()
}
```

## Concurrency

The scheduler runs with a default concurrency limit of **2 concurrent jobs**. When the limit is reached, additional jobs are rescheduled to run when a slot becomes available.

## Tracing

When tracing is enabled (`TRACE_ENABLE: true`), each job execution automatically creates an OpenTelemetry span named `job - {job_name}`. If a job triggers another job via `RunJob`, the trace context is propagated to the child job.
