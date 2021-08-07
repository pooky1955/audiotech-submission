import librosa
from cloning import split_clip, synthesize_speech, generate_embed
import torch

def polish_audio(filename):
    data, sr = librosa.load(filename)
