import sys
import os
print("HELLLLLLLLLLLLLLLLLLOOOOOOOOOOOoo")
current_path = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0,current_path)
from .audiotech import split_clip, synthesize_speech, generate_embed
