import torch
import ftfy
import spacy

from torch import autocast
from diffusers import StableDiffusionPipeline
print(torch.cuda.is_available())
model_id = "CompVis/stable-diffusion-v1-4"
# device = "cuda"

print("Yay")

pipe = StableDiffusionPipeline.from_pretrained("CompVis/stable-diffusion-v1-4", use_auth_token="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")
# pipe = pipe.to(device)
pipe = pipe.to(None)

prompt = "a can of beer drinking a human"
with autocast("cuda"):
    image = pipe(prompt, guidance_scale=7.5)["sample"][0]  
    
image.save("astronaut_rides_horse.png")
