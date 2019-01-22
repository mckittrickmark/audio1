from django.db import models

# Create your models here.


class Sample(models.Model):
  name = models.CharField(max_length=50)
  description = models.CharField(max_length=100)

  def __str__(self):
    return self.name

class Subreddit(models.Model):
  name = models.CharField(max_length=100)

class DatePeriod(models.Model):
  period_start = models.DateTimeField(null=True, blank=True)
  period_end = models.DateTimeField(null=True, blank=True)

class Topic(models.Model):
  name = models.CharField(max_length=255, default="")
  subreddit_id = models.ForeignKey(Subreddit, on_delete=models.CASCADE)
  date_period_id = models.ForeignKey(DatePeriod, on_delete=models.CASCADE)
  sentiment_score = models.IntegerField()
  subreddit_rank = models.IntegerField()
  frequency = models.IntegerField()


