from encoder import inference as encoder
from synthesizer.inference import Synthesizer
from vocoder import inference as vocoder
from pathlib import Path
from time import perf_counter as timer
from toolbox.utterance import Utterance
import numpy as np
import traceback
import sys
import torch
import librosa
from audioread.exceptions import NoBackendError
import torch
from transformers import Wav2Vec2Tokenizer, Wav2Vec2ForCTC
import soundfile as sf
import os
import time

print("LOADING PRETRAINED MODELS")
######################################
########## LOADING Wav2Vec ###########
######################################
pretrained_link = "facebook/wav2vec2-large-960h-lv60"
tokenizer = Wav2Vec2Tokenizer.from_pretrained(pretrained_link)
model = Wav2Vec2ForCTC.from_pretrained(pretrained_link)




######################################################
########## LOADING Real Time Voice Cloning ###########
######################################################
os.chdir(Path(__file__).parent.absolute())
ENCODER_PATH = Path("encoder/saved_models/pretrained.pt")
SYNTHESIZER_PATH = Path("synthesizer/saved_models/pretrained/pretrained.pt")
VOCODER_PATH = Path("vocoder/saved_models/pretrained/pretrained.pt")
encoder.load_model(ENCODER_PATH)
synthesizer = Synthesizer(SYNTHESIZER_PATH)
vocoder.load_model(VOCODER_PATH)

print("FINISHED LOADING PRETRAINED MODELS")

def get_default_device():
    return torch.device("cpu")
    # return torch.device("cpu") if not torch.cuda.is_available() else torch.device("cuda")

def to_t(value,device=get_default_device()):
    return torch.tensor(value,device=device)

def predict_text(target_wav):
  target_tensor = np.squeeze(np.array(target_wav))
  input_values = tokenizer(target_tensor,return_tensors='pt',padding="longest").input_values.to(get_default_device())
  logits = model(input_values).logits
  predicted_ids = torch.argmax(logits, dim=-1)
  transcription = tokenizer.decode(predicted_ids[0])
  return transcription

def infer_text(wav_path):
    original_wav, original_sr = librosa.load(wav_path,16000)
    assert original_sr == 16000
    return predict_text(original_wav)
 

def generate_embed(wavs):
    all_embeds = []
    for wav in wavs:
        encoder_wav = encoder.preprocess_wav(np.squeeze(np.array(wav)))
        embed = encoder.embed_utterance(encoder_wav)
        all_embeds.append(embed)
    return np.mean(all_embeds,axis=0)

def synthesize_speech(text,avg_embed):
    spec = synthesizer.synthesize_spectrograms([text], avg_embed)
    generated_wav = vocoder.infer_waveform(spec[0])
    return generated_wav



def split_clip(wav,sr,seconds=5):
    clip_length = len(wav) / sr
    num_clips = int(clip_length / seconds)
    sample_step = seconds * sr
    all_wavs = []
    for i in range(num_clips):
        target_wav = wav[sr * sample_step: sr * sample_step + sample_step]
        all_wavs.append(target_wav)
    return all_wavs

def pipeline(audio_file,embed):
    text = infer_text(audio_file)

def generate_embed_from_wav(wav_paths):
    all_wavs = []
    for wav_path in wav_paths:
        wav, sr = librosa.load(wav_path,16000)
        all_wavs.append(wav)

    avg_embed = generate_embed(all_wavs)
    return avg_embed



if __name__ == "__main__":
    # target_text = "One of the two people who tested positive for the novel coronavirus in the United Kingdom is a student at the University of York in northern England."
    target_text = "Rachel Lynde lived just where the Avonlea main road dipped down into a little hollow fringed with alders and ladies, eardrops and traversed by a brook"
    for i in range(10):
        avg_embed = generate_embed_from_wav([
            "../embeds/ProfileClip1.wav",
            "../embeds/ProfileClip2.wav",
            "../embeds/ProfileClip3.wav",
        ])
        generated_speech = synthesize_speech(target_text, avg_embed)
        sf.write(f"../synthetized_final_{i}_avg_2.wav",generated_speech,16000)
        print("finished synth")



    # start = time.time()
    # predicted_text = infer_text("../james_speaking.wav")
    # end = time.time()
    # print(f"Time took : {end - start}")
    # print(predicted_text)

    # all_wavs = split_clip(james_wav,target_sr)
    # james_embed = generate_embed(all_wavs)
    # text = 'One of the two people who tested positive for the novel coronavirus in the United Kingdom is a student at the University of York in northern England.'
    # generated_speech = synthesize_speech(text,james_embed)
    # sf.write("../output.wav",generated_speech,16000)


