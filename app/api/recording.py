import os
import requests
from flask import Blueprint, request
from flask_login import login_required


bp = Blueprint('recording', __name__, url_prefix="/recording")


@bp.route("", methods=["POST"])
@login_required
def post_recording():
    headers = {'authorization': os.environ.get('ASSEMBLYAI_API_KEY')}

    def get_upload_url():
        data = request.files.get('recording')
        response = requests.post('https://api.assemblyai.com/v2/upload',
                                 headers=headers,
                                 data=data)
        data = response.json()
        return data['upload_url']

    def post_transcript(upload_url):
        endpoint = "https://api.assemblyai.com/v2/transcript"
        json = {
            "audio_url": upload_url,
            "entity_detection": True
        }
        response = requests.post(endpoint, json=json, headers=headers)
        data = response.json()
        return data.get('id')

    def get_transcript(transcript_id):
        endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"
        response = requests.get(endpoint, headers=headers)
        data = response.json()
        print(data.get('status'), data.get('text'), data.get('entities'))
        return data

    upload_url = get_upload_url()
    transcript_id = post_transcript(upload_url)
    print('-'*50, 'upload_url', upload_url)
    print('-'*50, 'transcript_id', transcript_id)
    result = None
    while result is None:
        response = get_transcript(transcript_id)
        if response['status'] == 'completed':
            result = response['text']
    print('*'*50, result)
    return {"result": result}, 200
