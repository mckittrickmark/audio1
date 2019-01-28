from psaw import PushshiftAPI
import praw

api = PushshiftAPI()
gen = api.search_comments(limit=3)
results = list(gen)
print(results)
