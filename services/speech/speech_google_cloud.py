import sys
import speech_recognition as sr
import json


audio_file = sys.argv[1]


def googleSpeechCloud(audio_file):

  with open('./serv/podcast1-cred.json') as myfile:
    json_creds=myfile.read()

  r = sr.Recognizer()
  print(audio_file)
  audioOutput = "Hello World"

  audio_object = sr.AudioFile(audio_file)
  with audio_object as source:
    audioRecorded = r.record(source)
  audioOutput = r.recognize_google_cloud(audioRecorded, credentials_json=json_creds, show_all=True)

  print(audioOutput)

  audioNameStartPosition = audio_file.rfind('/')
  audioNameStartPosition += 1

  audioNameEndPosition = audio_file.rfind('.')

  audioFileName = audio_file[audioNameStartPosition:audioNameEndPosition]

  audioFileName += '.py'

  fileOutput = open(audioFileName, 'w+')

  fileOutput.write(json.dumps(audioOutput))

  fileOutput.close()

  print("Output file written")

  return audioFileName
