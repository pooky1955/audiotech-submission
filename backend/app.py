import os
#import magic
import urllib.request
from flask import Flask, request
from werkzeug.utils import secure_filename
from util import polish_audio
import json
from flask_cors import CORS
import time
import numpy as np

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "./uploads"
CORS(app)

ALLOWED_EXTENSIONS = set(["mp4","webm","mp3","wav","ogg","mpv","mov"])

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS
	
def error(text):
    return text, 400


@app.route('/', methods=['POST'])
def upload_file():
    start = time.time()
    if request.method == 'POST':
    # check if the post request has the file part
        if 'video' not in request.files:
            return error("No file selected for uploading")

        video = request.files['video']
        if video.filename == '':
            return error('No file selected for uploading')
        if video and allowed_file(video.filename):
            filename = secure_filename(video.filename)
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            import ipdb; ipdb.set_trace()
            video.save(filepath)
            wav_filepath = '.'.join(filepath.split(".")[:-1]) + ".wav"
            os.system(f"ffmpeg -i {filepath} -vn {wav_filepath}")
            result = polish_audio(wav_filepath)
            return json.dumps(dict(a="hi"))
        else:

            return error('Allowed file types are mp4')

if __name__ == "__main__":
    app.run(threaded=False)
