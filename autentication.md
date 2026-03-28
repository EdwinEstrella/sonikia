{
  "openapi": "3.1.0",  
  "info": {
    "title": "Musicgpt API",
    "version": "1.0.0",
    "description": "API for retrieving conversion details by ID."
  },
  "servers": [
    {
      "url": "https://api.musicgpt.com/api/public",
      "description": "Production server"
    }
  ],
  "paths": {
    "/v1/byId": {
      "get": {
        "summary": "Get Conversion by ID",
        "description": "Retrieve details of a conversion using `task_id` or `conversion_id`.",
        "parameters": [
          {
            "name": "conversionType",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string",
              "enum": ["MUSIC_AI", "TEXT_TO_SPEECH", "VOICE_CONVERSION", "EXTRACTION", "COVER", "STEMS_SEPARATION", "VOCAL_EXTRACTION", "DENOISING", "DEECHO", "DEREVERB", "SOUND_GENERATOR", "AUDIO_TRANSCRIPTION", "AUDIO_SPEED_CHANGER", "AUDIO_MASTERING", "AUDIO_CUTTER", "REMIX","FILE_CONVERT","KEY_BPM_EXTRACTION","AUDIO_TO_MIDI","EXTEND","INPAINT","SING_OVER_INSTRUMENTAL","LYRICS_GENERATOR" ]                  
            },
            "description": "The type of Conversion you want to get your details from.",
            "example": "MUSIC_AI"
          },
          {
            "name": "task_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            },
            "description": "Task ID associated with the conversion. \n **Note:** You must provide either `task_id` or `conversion_id`, but not both.",
            "example": "12345678-abcd-1234-efgh-567890abcdef"
          },
          {
            "name": "conversion_id",
            "in": "query",
            "required": false,
            "schema": {
              "type": "string"
            },
            "description": "Conversion ID to fetch details. \n **Note:** You must provide either `task_id` or `conversion_id`, but not both.",
            "example": "87654321-dcba-4321-hgfe-098765fedcba" 
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "conversion": {
                      "type": "object",
                      "properties": {
                        "task_id": {
                          "type": "string"
                        },
                        "conversion_id": {
                          "type": "string"
                        },
                        "status": {
                          "type": "string"
                        },
                        "status_msg": {
                          "type": "string"
                        },
                        "audio_url": {
                          "type": "string"
                        },
                        "conversion_cost": {
                          "type": "number"
                        },
                        "title": {
                          "type": "string"
                        },
                        "lyrics": {
                          "type": "string"
                        },
                        "music_style": {
                          "type": "string"
                        },
                        "createdAt": {
                          "type": "string",
                          "format": "date-time"
                        },
                        "updatedAt": {
                          "type": "string",
                          "format": "date-time"
                        }
                      }
                    }
                  }
                },
                "example": {
                  "success": true,
                  "conversion": {
                    "task_id": "12345678-abcd-1234-efgh-567890abcdef",
                    "conversion_id": "87654321-dcba-4321-hgfe-098765fedcba",
                    "status": "COMPLETED",
                    "status_msg": "Conversion successful",
                    "audio_url": "https://musicgpt.s3.amazonaws.com/audiofile.mp3",
                    "conversion_cost": 1.25,
                    "title": "Generated Song",
                    "lyrics": "[Verse 1]...",
                    "music_style": "Pop",
                    "createdAt": "2025-01-01T12:00:00Z",
                    "updatedAt": "2025-01-01T12:05:00Z"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad Request",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "message": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "message": "Invalid request parameters"
                }
              }
            }
          }
        },
        "security": [
          {
            "ApiKeyAuth": []
          }
        ]
      }
    },
    "/v2/MusicAI/stream": {
      "get": {
        "summary": "Get Conversion by ID Streaming",
        "description": "Streams the generated audio for a conversion created with **Music AI v2**.\n\nTo listen to the live stream, replace the placeholders in the example request with your actual `task_id` and `conversion_id`, and poll the endpoint until streaming becomes available:\nhttps://api.musicgpt.com/api/public/v2/MusicAI/stream?task_id={your_task_id}&conversion_id={your_conversion_id}",

        "parameters": [
          {
            "name": "task_id",
            "in": "query", 
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "Task ID associated with the conversion.",
            "example": "12345678-abcd-1234-efgh-567890abcdef"
          },
          {
            "name": "conversion_id",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "Conversion ID to fetch details.",
            "example": "87654321-dcba-4321-hgfe-098765fedcba" 
          }
        ],
        "responses": {

          "401": {
            "description": "Unauthorized",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "message": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "detail": "Upgrade Plans to access Streaming"
                }
              }
            }
          }
        },
        "security": [
          {
            "ApiKeyAuth": []
          }
        ]
      }
    },
    "/v1/searchVoices": {
      "get": {
        "summary": "Get Voices by Name",
        "description": "Search for voices to get their voice ID by their names using a query string.",
        "parameters": [
          {
            "name": "query",
            "in": "query",
            "required": true,
            "schema": {
              "type": "string"
            },
            "description": "The search string to filter voices by name"
          },
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 20
            },
            "description": "Maximum number of voices per page"
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 0
            },
            "description": "Page number for pagination"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "voices": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "voice_id": {
                            "type": "string"
                          },
                          "voice_name": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "limit": {
                      "type": "integer"
                    },
                    "page": {
                      "type": "integer"
                    },
                    "total": {
                      "type": "integer"
                    }
                  }
                },
                "example": {
                  "success": true,
                  "voices": [
                    {
                      "voice_id": "JustinBieber",
                      "voice_name": "Justin Bieber"
                    }
                  ],
                  "limit": 20,
                  "page": 0,
                  "total": 2
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Internal Server Error"
                }
              }
            }
          }
        },
        "security": [
          {
            "ApiKeyAuth": []
          }
        ]
      }
    },
    "/v1/getAllVoices": {
      "get": {
        "summary": "Get All Voices",
        "description": "Fetch all available voices with their IDs.",
        "parameters": [
          {
            "name": "limit",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 20
            },
            "description": "Maximum number of voices per page"
          },
          {
            "name": "page",
            "in": "query",
            "required": false,
            "schema": {
              "type": "integer",
              "default": 0
            },
            "description": "Page number for pagination"
          }
        ],
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "voices": {
                      "type": "array",
                      "items": {
                        "type": "object",
                        "properties": {
                          "voice_id": {
                            "type": "string"
                          },
                          "voice_name": {
                            "type": "string"
                          }
                        }
                      }
                    },
                    "limit": {
                      "type": "integer"
                    },
                    "page": {
                      "type": "integer"
                    },
                    "total": {
                      "type": "integer"
                    }
                  }
                },
                "example": {
                  "success": true,
                  "voices": [
                    {
                      "voice_id": "00126f62-1f31-434a-abc6-a5e958a737e3",
                      "voice_name": "Joji"
                    },
                    {
                      "voice_id": "0031cf05-6d3d-4c15-9115-d8236590b957",
                      "voice_name": "Amy Winehouse"
                    }
                  ],
                  "limit": 20,
                  "page": 0,
                  "total": 3108
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Internal Server Error"
                }
              }
            }
          }
        },
        "security": [
          {
            "ApiKeyAuth": []
          }
        ]
      }
    },
    "/v1/MusicAI": {
      "post": {
        "summary": "Generate Custom Music",
        "description": "Create music powered by AI using just a prompt, lyrics, or a defined music style.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "prompt": {
                    "type": "string",
                    "description": "A natural language prompt for music generation. Keep it under 280 characters for guaranteed results, but detailed—the clearer and more descriptive it is, the better the outcome."
                  },
                  "music_style": {
                    "type": "string",
                    "description": "Style of music to generate (e.g., Rock, Pop)"
                  },
                  "lyrics": {
                    "type": "string",
                    "description": "Custom lyrics for the generated music"
                  },
                  "make_instrumental": {
                    "type": "boolean",
                    "description": "Whether to make the music instrumental",
                    "default": false
                  },
                  "vocal_only": {
                    "type": "boolean",
                    "description": "Whether to generate only vocals of output audio",
                    "default": false
                  },
                  "gender": {
                    "type": "string",
                    "description": "Gender of the voice model"
                  },
                  "voice_id": {
                    "type": "string",
                    "description": "Voice model to convert generated audio"
                  },
                  "output_length": {
                    "type": "number",
                    "format":"float",
                    "description" : "The requested output audio length of the request in seconds. This feature is purely experimental."
            

                },
                  "webhook_url": {
                    "type": "string",
                    "description": "URL for callback upon completion"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "message": {
                      "type": "string"
                    },
                    "task_id": {
                      "type": "string"
                    },
                    "conversion_id_1": {
                      "type": "string"
                    },
                    "conversion_id_2": {
                      "type": "string"
                    },
                    "eta": {
                      "type": "integer"
                    }
                  }
                },
                "example": {
                  "success": true,
                  "message": "Message published to queue",
                  "task_id": "4fc2cdba-005d-4d14-a208-5fb02a2809da",
                  "conversion_id_1": "05092d5c-f8b1-4c96-a4a3-45bc00de6268",
                  "conversion_id_2": "52fcd3b6-3925-41ed-b4c6-aee17a29e40b",
                  "eta": 154
                }
              }
            }
          },
          "402": {
            "description": "Payment Required",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Insufficient credit balance"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Internal Server Error"
                }
              }
            }
          }
        },
        "security": [
          {
            "ApiKeyAuth": []
          }
        ]
      }
    },
    "/v2/MusicAI": {
      "post": {
        "summary": "Generate Custom Music",
        "description": "Create music powered by AI using just a prompt, lyrics, or a defined music style.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "prompt": {
                    "type": "string",
                    "description": "A natural language prompt for music generation. Keep it under 280 characters for guaranteed results, but detailed—the clearer and more descriptive it is, the better the outcome."
                  },
                  "music_style": {
                    "type": "string",
                    "description": "Style of music to generate (e.g., Rock, Pop)"
                  },
                  "lyrics": {
                    "type": "string",
                    "description": "Custom lyrics for the generated music"
                  },
                  "make_instrumental": {
                    "type": "boolean",
                    "description": "Whether to make the music instrumental",
                    "default": false
                  },
                  "vocal_only": {
                    "type": "boolean",
                    "description": "Whether to generate only vocals of output audio",
                    "default": false
                  },

                  "output_length": {
                    "type": "number",
                    "description" : "The requested output audio length of the request in seconds. This feature is purely experimental."

                  },
                  "gender": {
                    "type": "string",
                    "description": "Gender of the voice model"
                  },
                  "webhook_url": {
                    "type": "string",
                    "description": "URL for callback upon completion"
                  }
                  
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "message": {
                      "type": "string"
                    },
                    "task_id": {
                      "type": "string"
                    },
                    "conversion_id_1": {
                      "type": "string"
                    },
                    "conversion_id_2": {
                      "type": "string"
                    },
                    "eta": {
                      "type": "integer"
                    }
                  }
                },
                "example": {
                  "success": true,
                  "message": "Message published to queue",
                  "task_id": "4fc2cdba-005d-4d14-a208-5fb02a2809da",
                  "conversion_id_1": "05092d5c-f8b1-4c96-a4a3-45bc00de6268",
                  "conversion_id_2": "52fcd3b6-3925-41ed-b4c6-aee17a29e40b",
                  "eta": 154
                }
              }
            }
          },
          "402": {
            "description": "Payment Required",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Insufficient credit balance"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Internal Server Error"
                }
              }
            }
          }
        },
        "security": [
          {
            "ApiKeyAuth": []
          }
        ]
      }
    },
    "/v2/MusicAI/batch": {
      "post": {
        "summary": "Generate Custom Music",
        "description": "Create music powered by AI using just a prompt, lyrics, or a defined music style.",
        "requestBody": {
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "prompt": {
                    "type": "string",
                    "description": "A natural language prompt for music generation. Keep it under 280 characters for guaranteed results, but detailed—the clearer and more descriptive it is, the better the outcome."
                  },
                  "music_style": {
                    "type": "string",
                    "description": "Style of music to generate (e.g., Rock, Pop)"
                  },
                  "lyrics": {
                    "type": "string",
                    "description": "Custom lyrics for the generated music"
                  },
                  "make_instrumental": {
                    "type": "boolean",
                    "description": "Whether to make the music instrumental",
                    "default": false
                  },
                  "vocal_only": {
                    "type": "boolean",
                    "description": "Whether to generate only vocals of output audio",
                    "default": false
                  },
                  "voice_id": {
                    "type": "string",
                    "description": "Voice model to convert generated audio"
                  },
                  "output_length": {
                    "type": "number",
                    "format":"float",
                    "description" : "The requested output audio length of the request in seconds. This feature is purely experimental." 

                },
                  "num_outputs": {
                    "type": "number",
                    "format":"integer",
                    "description" : "The number of outputs to generate (1 or 2 only)."
                  },
                  "webhook_url": {
                    "type": "string",
                    "description": "URL for callback upon completion"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "Successful response",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "message": {
                      "type": "string"
                    },
                    "task_id": {
                      "type": "string"
                    },
                    "conversion_id_1": {
                      "type": "string"
                    },
                    "conversion_id_2": {
                      "type": "string"
                    },
                    "eta": {
                      "type": "integer"
                    }
                  }
                },
                "example": {
                  "success": true,
                  "message": "Message published to queue",
                  "task_id": "4fc2cdba-005d-4d14-a208-5fb02a2809da",
                  "conversion_id_1": "05092d5c-f8b1-4c96-a4a3-45bc00de6268",
                  "conversion_id_2": "52fcd3b6-3925-41ed-b4c6-aee17a29e40b",
                  "eta": 154
                }
              }
            }
          },
          "402": {
            "description": "Payment Required",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Insufficient credit balance"
                }
              }
            }
          },
          "500": {
            "description": "Internal Server Error",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "success": {
                      "type": "boolean"
                    },
                    "error": {
                      "type": "string"
                    }
                  }
                },
                "example": {
                  "success": false,
                  "error": "Internal Server Error"
                }
              }
            }
          }
        },
        "security": [
          {
            "ApiKeyAuth": []
          }
        ]
      }
    },
"/v1/VoiceChanger": {
  "post": {
    "summary": "Convert voice from audio file or URL",
    "description": "Convert the voice from an audio file or URL to a different voice.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of audio file to process",
                "example": "https://example.com/audio.wav"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload"
              },
              "voice_id": {
                "type": "string",
                "description": "Voice model ID",
                "example": "demo-voice-id"
              },
              "remove_background": {
                "type": "integer",
                "description": "1 to remove background noise, 0 to keep",
                "default": 0,
                "enum": [0, 1]
              },
              "pitch": {
                "type": "integer",
                "description": "Pitch adjustment (-12 to +12)",
                "default": 0,
                "minimum": -12,
                "maximum": 12
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL",
                "example": "https://example.com/callback"
              }
            },
            "required": ["voice_id"],
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successful response",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" }
              }
            },
            "example": {
              "success": true,
              "task_id": "84038e1e-3687-4f7a-9c55-692754b125ee",
              "conversion_id": "e3631817-165d-4f17-a7e2-7008d200ff3e",
              "eta": 22
            }
          }
        }
      },
      "400": {
        "description": "Bad Request",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "The file could not be downloaded from the provided URL"
            }
          }
        }
      },
      "402": {
        "description": "Payment Required",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "Insufficient credit balance"
            }
          }
        }
      },
      "422": {
        "description": "Unprocessable Entity",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "Both audio_url and audio_file cannot be None"
            }
          }
        }
      },
      "500": {
        "description": "Internal Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "Internal Server Error"
            }
          }
        }
      }
    },
    "security": [
      {
        "ApiKeyAuth": []
      }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/VoiceChanger\"\n\npayload = {\n    \"audio_url\": \"<string>\",\n    \"voice_id\": \"<string>\",\n    \"remove_background\": \"<int>\",\n    \"pitch\": \"<int>\",\n    \"webhook_url\": \"<string>\"\n}\n\n# For file upload instead of URL:\n# files = {'audio_file': open('filepath', 'rb')}\n\nheaders = {\n    \"Authorization\": \"<API Key>\"\n}\n\nresponse = requests.post(url, data=payload, headers=headers)\n# For file upload:\n# response = requests.post(url, data=payload, files=files, headers=headers)\n\nprint(response.text)"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = \"https://api.musicgpt.com/api/public/v1/VoiceChanger\";\n$apiKey = \"<API_KEY>\";\n\n// For URL-based processing\n$data = [\n    \"audio_url\" => \"<AUDIO_URL>\",\n    \"voice_id\" => \"<VOICE_ID>\",\n    \"remove_background\" => 0, // 0 or 1\n    \"pitch\" => 0, // -12 to +12\n    \"webhook_url\" => \"<WEBHOOK_URL>\"\n];\n\n// For file upload (uncomment and replace)\n// $data = [\"voice_id\" => \"<VOICE_ID>\"];\n// $file = new CURLFile('path/to/audio.wav', 'audio/wav', 'audio_file');\n\n$headers = [\n    \"Authorization: \" . $apiKey\n];\n\n$ch = curl_init();\ncurl_setopt($ch, CURLOPT_URL, $url);\ncurl_setopt($ch, CURLOPT_POST, 1);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\n// For file upload:\n// curl_setopt($ch, CURLOPT_POSTFIELDS, array_merge($data, ['audio_file' => $file]));\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n\n$response = curl_exec($ch);\ncurl_close($ch);\n\necho $response;\n?>"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"mime/multipart\"\n\t\"net/http\"\n\t\"os\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/VoiceChanger\"\n\tapiKey := \"<API_KEY>\"\n\n\t// For URL-based processing\n\tpayload := map[string]string{\n\t\t\"audio_url\":        \"<AUDIO_URL>\",\n\t\t\"voice_id\":        \"<VOICE_ID>\",\n\t\t\"remove_background\": \"0\",\n\t\t\"pitch\":           \"0\",\n\t\t\"webhook_url\":     \"<WEBHOOK_URL>\",\n\t}\n\n\t// For file upload (uncomment and replace)\n\t// file, _ := os.Open(\"audio.wav\")\n\t// defer file.Close()\n\n\tbody := &bytes.Buffer{}\n\twriter := multipart.NewWriter(body)\n\n\tfor key, val := range payload {\n\t\t_ = writer.WriteField(key, val)\n\t}\n\n\t// For file upload:\n\t// part, _ := writer.CreateFormFile(\"audio_file\", \"audio.wav\")\n\t// io.Copy(part, file)\n\twriter.Close()\n\n\treq, _ := http.NewRequest(\"POST\", url, body)\n\treq.Header.Set(\"Authorization\", apiKey)\n\treq.Header.Set(\"Content-Type\", writer.FormDataContentType())\n\n\tclient := &http.Client{}\n\tresp, err := client.Do(req)\n\tif err != nil {\n\t\tfmt.Println(err)\n\t\treturn\n\t}\n\tdefer resp.Body.Close()\n\n\tresponse, _ := io.ReadAll(resp.Body)\n\tfmt.Println(string(response))\n}"
      },
      {
        "lang": "Java",
        "source": "import okhttp3.*;\n\nimport java.io.File;\nimport java.io.IOException;\n\npublic class VoiceChanger {\n    public static void main(String[] args) throws IOException {\n        String url = \"https://api.musicgpt.com/api/public/v1/VoiceChanger\";\n        String apiKey = \"<API_KEY>\";\n\n        // For URL-based processing\n        RequestBody requestBody = new FormBody.Builder()\n                .add(\"audio_url\", \"<AUDIO_URL>\")\n                .add(\"voice_id\", \"<VOICE_ID>\")\n                .add(\"remove_background\", \"0\")\n                .add(\"pitch\", \"0\")\n                .add(\"webhook_url\", \"<WEBHOOK_URL>\")\n                .build();\n\n        // For file upload (uncomment and replace)\n        /*\n        File audioFile = new File(\"audio.wav\");\n        RequestBody requestBody = new MultipartBody.Builder()\n                .setType(MultipartBody.FORM)\n                .addFormDataPart(\"voice_id\", \"<VOICE_ID>\")\n                .addFormDataPart(\"audio_file\", \"audio.wav\",\n                        RequestBody.create(audioFile, MediaType.parse(\"audio/wav\")))\n                .build();\n        */\n\n        Request request = new Request.Builder()\n                .url(url)\n                .post(requestBody)\n                .header(\"Authorization\", apiKey)\n                .build();\n\n        OkHttpClient client = new OkHttpClient();\n        try (Response response = client.newCall(request).execute()) {\n            System.out.println(response.body().string());\n        }\n    }\n}"
      }
    ]
  }
},  
"/v1/Cover": {
  "post": {
    "summary": "Convert audio to cover song",
    "description": "Convert an audio file or URL into a cover song using a different voice.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of an audio file to process. Either audio_url or audio_file must be provided.",
                "example": "https://example.com/audio.wav"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process. Either audio_file or audio_url must be provided."
              },
              "voice_id": {
                "type": "string",
                "description": "The ID of the voice model to use for voice transformation.",
                "example": "demo-voice-id"
              },
              "pitch": {
                "type": "integer",
                "description": "Pitch adjustment for the voice. Range from -12 to 12. Default: 0",
                "default": 0,
                "minimum": -12,
                "maximum": 12
              },
              "webhook_url": {
                "type": "string",
                "description": "A URL where the result will be sent once processing is completed.",
                "example": "https://example.com/callback"
              }
            },
            "required": ["voice_id"] ,
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successful response",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" }
              }
            },
            "example": {
              "success": true,
              "task_id": "b329c0df-b2eb-4914-b707-4d7dce53577e",
              "conversion_id": "16708396-da86-4a9e-9b90-66f774cc2382",
              "eta": 33
            }
          }
        }
      },
      "400": {
        "description": "Bad Request",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "The file could not be downloaded from the provided URL"
            }
          }
        }
      },
      "402": {
        "description": "Payment Required",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "Insufficient credit balance"
            }
          }
        }
      },
      "422": {
        "description": "Unprocessable Entity",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "Both audio_url and audio_file cannot be None"
            }
          }
        }
      },
      "500": {
        "description": "Internal Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "error": { "type": "string" }
              }
            },
            "example": {
              "success": false,
              "error": "Internal Server Error"
            }
          }
        }
      }
    },
    "security": [
      {
        "ApiKeyAuth": []
      }
    ]
  }
},

"/v1/TextToSpeech": {
  "post": {
    "summary": "Convert text to speech using a specified voice",
    "description": "Synthesize speech from text with voice and gender customization, plus optional webhook callback.  \nGive priority to the sample audio first, then to the voice ID, and lastly to gender.",
    "requestBody": {
      "required": true,
      "content": {
        "application/json": {
          "schema": {
            "type": "object",
            "properties": {
              "text": {
                "type": "string",
                "description": "Text to convert to speech"
              },
              "voice_id": {
                "type": "string",
                "description": "Voice model ID"
              },
              "gender": {
                "type": "string",
                "description": "Gender preference for the voice (e.g., \"male\", \"female\")"
              },
              "sample_audio_url":{
                "type":"string",
                "description":"An audio URL containing a voice sample of the target speaker without music or overlapping voices. Recommended over voice_id for better output quality."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing"
              }
            },
            "required": ["text"],
            "anyOf": [
                { "required": ["sample_audio_url"] },
                { "required": ["voice_id"] }
              ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated TTS conversion",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" }
              },
              "example": {
                "success": true,
                "task_id": "72eed5b0-8652-4bb4-9a95-eb0ad4850f12",
                "conversion_id": "648a6823-b2a4-47b3-801e-f452c567ae6f",
                "eta": 19
              }
            }
          }
        }
      },
      "402": {
        "description": "Payment Required",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Insufficient credit balance" }
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Missing required field: text" }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      {
        "ApiKeyAuth": []
      }
    ]
  }
}, 
"/v1/Extraction": {
    "post": {
      "summary": "Extract stems from an audio file or URL",
      "description": "Process an audio file to extract specified stems (vocals, instrumental, or other components) with optional preprocessing. Supports file upload or URL with webhook callback.",
      "requestBody": {
        "required": true,
        "content": {
          "multipart/form-data": {
            "schema": {
              "type": "object",
              "properties": {
                "audio_url": {
                  "type": "string",
                  "description": "The URL of the audio file to process.",
                  "example": "https://www.youtube.com/watch?v=jGflUbPQfW8"
                },
                "audio_file": {
                  "type": "string",
                  "format": "binary",
                  "description": "Audio file to upload and process."
                },
                "stems": {
                  "type": "string",
                  "default": "[]",
                  "description": "JSON string list of required output stems. Available options: vocals, instrumental, male_vocal, female_vocal, lead_vocal, back_vocal, bass, drums, guitar, piano, keys, strings, winds, rhythm_guitar, solo_guitar, acoustic_guitar, electric_guitar, kick_drum, snare_drum, toms, hi_hat, ride, crash.",
                  "example": "[\"vocals\", \"drums\"]"
                },
                "preprocessing_options": {
                  "type": "string",
                  "default": "[]",
                  "description": "JSON string list of preprocessing steps. Available options: Denoise, Deecho, Dereverb.",
                  "example": "[\"Denoise\", \"Dereverb\"]"
                },
                "webhook_url": {
                  "type": "string",
                  "description": "Callback URL for async processing.",
                  "example": "http://webhook.musicgpt.com"
                }
              },
              "anyOf": [
                { "required": ["audio_url"] },
                { "required": ["audio_file"] }
              ]
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Successfully initiated audio extraction",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "success": { "type": "boolean" },
                  "task_id": { "type": "string" },
                  "conversion_id": { "type": "string" },
                  "eta": { 
                    "type": "integer",
                    "description": "Time in seconds to completion. -1 if unknown"
                  },
                  "credit_estimate": {
                    "type": "number",
                    "format": "float",
                    "description": "Estimated credit cost"
                  }
                },
                "example": {
                  "success": true,
                  "task_id": "62725d68-01e8-4c87-8fb0-298aa81c529c",
                  "conversion_id": "46b358c9-b22f-49d1-a68d-17901a6a549b",
                  "eta": 11,
                  "credit_estimate": 2.5
                }
              }
            }
          }
        },
        "422": {
          "description": "Validation Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "success": { "type": "boolean", "example": false },
                  "error": { "type": "string", "example": "Either audio_url or audio_file must be provided." }
                }
              }
            }
          }
        },
        "500": {
          "description": "Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "success": { "type": "boolean", "example": false },
                  "error": { "type": "string", "example": "Internal Server Error" }
                }
              }
            }
          }
        }
      },
      "security": [
        {
          "ApiKeyAuth": []
        }
      ],
      "x-codeSamples": [
        {
          "lang": "Python",
          "source": "import requests\nimport json\n\nurl = \"https://api.musicgpt.com/api/public/v1/Extraction\"\nheaders = {\n    \"Authorization\": \"<API_KEY>\"\n}\n\nfiles = {\n    \"audio_file\": open(\"path_to_audio.mp3\", \"rb\")\n}\ndata = {\n    \"audio_url\": \"\",\n    \"stems\": json.dumps([\"vocals\", \"drums\"]),\n    \"preprocessing_options\": json.dumps([\"Denoise\"]),\n    \"webhook_url\": \"http://webhook.musicgpt.com\"\n}\n\nresponse = requests.post(url, headers=headers, data=data, files=files)\nprint(response.json())"
        },
        {
          "lang": "PHP",
          "source": "$curl = curl_init();\n\n$stems = json_encode(['vocals', 'drums']);\n$preprocessing = json_encode(['Denoise']);\n\ncurl_setopt_array($curl, [\n    CURLOPT_URL => 'https://api.musicgpt.com/api/public/v1/Extraction',\n    CURLOPT_RETURNTRANSFER => true,\n    CURLOPT_POST => true,\n    CURLOPT_POSTFIELDS => [\n        'audio_url' => '',\n        'stems' => $stems,\n        'preprocessing_options' => $preprocessing,\n        'webhook_url' => 'http://webhook.musicgpt.com',\n        'audio_file' => new CURLFile('path_to_audio.mp3')\n    ],\n    CURLOPT_HTTPHEADER => [\n        'Authorization: <API_KEY>',\n        'Accept: application/json'\n    ]\n]);\n\n$response = curl_exec($curl);\ncurl_close($curl);\n\necho $response;"
        },
        {
          "lang": "Go",
          "source": "package main\n\nimport (\n    \"bytes\"\n    \"encoding/json\"\n    \"fmt\"\n    \"io\"\n    \"mime/multipart\"\n    \"net/http\"\n    \"os\"\n)\n\nfunc main() {\n    body := &bytes.Buffer{}\n    writer := multipart.NewWriter(body)\n\n    file, _ := os.Open(\"path_to_audio.mp3\")\n    part, _ := writer.CreateFormFile(\"audio_file\", \"path_to_audio.mp3\")\n    io.Copy(part, file)\n    \n    stems, _ := json.Marshal([]string{\"vocals\", \"drums\"})\n    preprocessing, _ := json.Marshal([]string{\"Denoise\"})\n    \n    writer.WriteField(\"stems\", string(stems))\n    writer.WriteField(\"preprocessing_options\", string(preprocessing))\n    writer.WriteField(\"webhook_url\", \"http://webhook.musicgpt.com\")\n    writer.Close()\n\n    req, _ := http.NewRequest(\"POST\", \"https://api.musicgpt.com/api/public/v1/Extraction\", body)\n    req.Header.Add(\"Authorization\", \"<API_KEY>\")\n    req.Header.Add(\"Content-Type\", writer.FormDataContentType())\n\n    client := &http.Client{}\n    resp, _ := client.Do(req)\n    defer resp.Body.Close()\n\n    responseBody, _ := io.ReadAll(resp.Body)\n    fmt.Println(string(responseBody))\n}"
        },
        {
          "lang": "Java",
          "source": "import okhttp3.*;\nimport org.json.JSONArray;\nimport java.io.File;\nimport java.io.IOException;\n\npublic class MusicgptExtraction {\n    public static void main(String[] args) throws IOException {\n        OkHttpClient client = new OkHttpClient();\n\n        MediaType mediaType = MediaType.parse(\"audio/mpeg\");\n        File file = new File(\"path_to_audio.mp3\");\n\n        JSONArray stems = new JSONArray();\n        stems.put(\"vocals\");\n        stems.put(\"drums\");\n        \n        JSONArray preprocessing = new JSONArray();\n        preprocessing.put(\"Denoise\");\n\n        RequestBody fileBody = RequestBody.create(file, mediaType);\n        RequestBody requestBody = new MultipartBody.Builder().setType(MultipartBody.FORM)\n            .addFormDataPart(\"audio_file\", file.getName(), fileBody)\n            .addFormDataPart(\"stems\", stems.toString())\n            .addFormDataPart(\"preprocessing_options\", preprocessing.toString())\n            .addFormDataPart(\"webhook_url\", \"http://webhook.musicgpt.com\")\n            .build();\n\n        Request request = new Request.Builder()\n            .url(\"https://api.musicgpt.com/api/public/v1/Extraction\")\n            .post(requestBody)\n            .addHeader(\"Authorization\", \"<API_KEY>\")\n            .addHeader(\"Accept\", \"application/json\")\n            .build();\n\n        Response response = client.newCall(request).execute();\n        System.out.println(response.body().string());\n    }\n}"
        }
      ]
    }
  },
"/v1/deecho": {
  "post": {
    "summary": "Remove echo from an audio file or URL",
    "description": "Initiate an echo removal task using either an audio URL or file upload with optional webhook callback.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the audio file to process (e.g., YouTube, direct audio link).",
                "example": "https://www.youtube.com/watch?v=example123"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated echo removal",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" },
                "credit_estimate": { "type": "number", "format": "float" }
              },
              "example": {
                "success": true,
                "task_id": "deecho789",
                "conversion_id": "conv456",
                "eta": -1,
                "credit_estimate": 100.1
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_url or audio_file must be provided." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/deecho\"\nheaders = {\n    \"Authorization\": \"<<<api key>>>\"\n}\n\n# Option 1: URL\npayload = {\n    \"audio_url\": \"https://example.com/audio.m4a\",\n    \"webhook_url\": \"\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: File Upload\n# payload = {\n#     \"webhook_url\": \"https://www.test.requestcatcher.com/test\"\n# }\n# with open(\"audio.m4a\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=payload, files=files)\n# print(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/deecho';\n$headers = ['Authorization: <<<api key>>>'];\n\n// Option 1: URL\n$data = [\n    'audio_url' => 'https://example.com/audio.m4a',\n    'webhook_url' => ''\n];\n\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n\n// Option 2: File Upload\n$data = [\n    'webhook_url' => 'https://www.test.requestcatcher.com/test',\n    'audio_file' => new CURLFile('audio.m4a')\n];\n\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"mime/multipart\"\n\t\"net/http\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/deecho\"\n\theaders := map[string]string{\n\t\t\"Authorization\": \"<<<api key>>>\",\n\t}\n\n\t// Option 1: URL\n\tdata := \"audio_url=https://example.com/audio.m4a&webhook_url=\"\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(data))\n\tfor k, v := range headers {\n\t\treq.Header.Add(k, v)\n\t}\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n\n\t// Option 2: File Upload\n\tfile, _ := os.Open(\"audio.m4a\")\n\tdefer file.Close()\n\tbodyBuf := &bytes.Buffer{}\n\twriter := multipart.NewWriter(bodyBuf)\n\t_ = writer.WriteField(\"webhook_url\", \"https://www.test.requestcatcher.com/test\")\n\tpart, _ := writer.CreateFormFile(\"audio_file\", \"audio.m4a\")\n\tio.Copy(part, file)\n\twriter.Close()\n\n\treq, _ = http.NewRequest(\"POST\", url, bodyBuf)\n\treq.Header.Add(\"Authorization\", \"<<<api key>>>\")\n\treq.Header.Add(\"Content-Type\", writer.FormDataContentType())\n\tres, _ = http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ = io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      }
    ]
  }
},
 "/v1/denoise": {
  "post": {
    "summary": "Removes noise from an audio file or URL",
    "description": "Initiate a noise removal task using either an audio URL or file upload with optional webhook callback.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the audio file to process (e.g., YouTube, direct audio link).",
                "example": "https://www.youtube.com/watch?v=example123"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated noise removal",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" },
                "credit_estimate": { "type": "number", "format": "float" }
              },
              "example": {
                "success": true,
                "task_id": "denoise789",
                "conversion_id": "conv456",
                "eta": -1,
                "credit_estimate": 100.1
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_url or audio_file must be provided." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/denoise\"\nheaders = {\n    \"Authorization\": \"<<<api key>>>\"\n}\n\n# Option 1: URL\npayload = {\n    \"audio_url\": \"https://example.com/audio.m4a\",\n    \"webhook_url\": \"\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: File Upload\n# payload = {\n#     \"webhook_url\": \"https://www.test.requestcatcher.com/test\"\n# }\n# with open(\"audio.m4a\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=payload, files=files)\n# print(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/denoise';\n$headers = ['Authorization: <<<api key>>>'];\n\n// Option 1: URL\n$data = [\n    'audio_url' => 'https://example.com/audio.m4a',\n    'webhook_url' => ''\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n\n// Option 2: File Upload\n$data = [\n    'webhook_url' => 'https://www.test.requestcatcher.com/test',\n    'audio_file' => new CURLFile('audio.m4a')\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"mime/multipart\"\n\t\"net/http\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/denoise\"\n\theaders := map[string]string{\n\t\t\"Authorization\": \"<<<api key>>>\"\n\t}\n\n\t// Option 1: URL\n\tdata := \"audio_url=https://example.com/audio.m4a&webhook_url=\"\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(data))\n\tfor k, v := range headers {\n\t\treq.Header.Add(k, v)\n\t}\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n\n\t// Option 2: File Upload\n\tfile, _ := os.Open(\"audio.m4a\")\n\tdefer file.Close()\n\tbodyBuf := &bytes.Buffer{}\n\twriter := multipart.NewWriter(bodyBuf)\n\t_ = writer.WriteField(\"webhook_url\", \"https://www.test.requestcatcher.com/test\")\n\tpart, _ := writer.CreateFormFile(\"audio_file\", \"audio.m4a\")\n\tio.Copy(part, file)\n\twriter.Close()\n\n\treq, _ = http.NewRequest(\"POST\", url, bodyBuf)\n\treq.Header.Add(\"Authorization\", \"<<<api key>>>\")\n\treq.Header.Add(\"Content-Type\", writer.FormDataContentType())\n\tres, _ = http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ = io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      }
    ]
  }
},
"/v1/dereverb": {
  "post": {
    "summary": "Removes reverberation from an audio file or URL",
    "description": "Initiate a reverberation removal task using either an audio URL or file upload with optional webhook callback.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the audio file to process (e.g., YouTube, direct audio link).",
                "example": "https://www.youtube.com/watch?v=example123"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated dereverberation",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" },
                "credit_estimate": { "type": "number", "format": "float" }
              },
              "example": {
                "success": true,
                "task_id": "dereverb789",
                "conversion_id": "conv456",
                "eta": -1,
                "credit_estimate": 100.1
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_url or audio_file must be provided." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/dereverb\"\nheaders = {\n    \"Authorization\": \"<<<api key>>>\"\n}\n\n# Option 1: URL\npayload = {\n    \"audio_url\": \"https://example.com/audio.m4a\",\n    \"webhook_url\": \"\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: File Upload\n# payload = {\n#     \"webhook_url\": \"https://www.test.requestcatcher.com/test\"\n# }\n# with open(\"audio.m4a\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=payload, files=files)\n# print(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/dereverb';\n$headers = ['Authorization: <<<api key>>>'];\n\n// Option 1: URL\n$data = [\n    'audio_url' => 'https://example.com/audio.m4a',\n    'webhook_url' => ''\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n\n// Option 2: File Upload\n$data = [\n    'webhook_url' => 'https://www.test.requestcatcher.com/test',\n    'audio_file' => new CURLFile('audio.m4a')\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"mime/multipart\"\n\t\"net/http\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/dereverb\"\n\theaders := map[string]string{\n\t\t\"Authorization\": \"<<<api key>>>\"\n\t}\n\n\t// Option 1: URL\n\tdata := \"audio_url=https://example.com/audio.m4a&webhook_url=\"\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(data))\n\tfor k, v := range headers {\n\t\treq.Header.Add(k, v)\n\t}\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n\n\t// Option 2: File Upload\n\tfile, _ := os.Open(\"audio.m4a\")\n\tdefer file.Close()\n\tbodyBuf := &bytes.Buffer{}\n\twriter := multipart.NewWriter(bodyBuf)\n\t_ = writer.WriteField(\"webhook_url\", \"https://www.test.requestcatcher.com/test\")\n\tpart, _ := writer.CreateFormFile(\"audio_file\", \"audio.m4a\")\n\tio.Copy(part, file)\n\twriter.Close()\n\n\treq, _ = http.NewRequest(\"POST\", url, bodyBuf)\n\treq.Header.Add(\"Authorization\", \"<<<api key>>>\")\n\treq.Header.Add(\"Content-Type\", writer.FormDataContentType())\n\tres, _ = http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ = io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      }
    ]
  }
},
"/v1/extract_key_bpm": {
  "post": {
    "summary": "Extract Key, BPM, and Key Changes from Audio",
    "description": "Processes an audio file to extract key changes, dominant key, and BPM (Beats Per Minute).",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the audio file to process (e.g., YouTube, direct audio link).",
                "example": "https://www.youtube.com/watch?v=example123"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated key/bpm extraction",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" },
                "credit_estimate": { "type": "number", "format": "float" },
                "message": { "type": "string" }
              },
              "example": {
                "success": true,
                "task_id": "keybpm789",
                "conversion_id": "conv456",
                "eta": -1,
                "credit_estimate": 100.1,
                "message": "Successfully published to queue"
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_url or audio_file must be provided." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/extract_key_bpm\"\nheaders = {\n    \"Authorization\": \"<<<api key>>>\"\n}\n\n# Option 1: URL\npayload = {\n    \"audio_url\": \"https://example.com/audio.m4a\",\n    \"webhook_url\": \"\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: File Upload\n# payload = {\n#     \"webhook_url\": \"https://www.test.requestcatcher.com/test\"\n# }\n# with open(\"audio.m4a\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=payload, files=files)\n# print(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/extract_key_bpm';\n$headers = ['Authorization: <<<api key>>>'];\n\n// Option 1: URL\n$data = [\n    'audio_url' => 'https://example.com/audio.m4a',\n    'webhook_url' => ''\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n\n// Option 2: File Upload\n$data = [\n    'webhook_url' => 'https://www.test.requestcatcher.com/test',\n    'audio_file' => new CURLFile('audio.m4a')\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"mime/multipart\"\n\t\"net/http\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/extract_key_bpm\"\n\theaders := map[string]string{\n\t\t\"Authorization\": \"<<<api key>>>\"\n\t}\n\n\t// Option 1: URL\n\tdata := \"audio_url=https://example.com/audio.m4a&webhook_url=\"\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(data))\n\tfor k, v := range headers {\n\t\treq.Header.Add(k, v)\n\t}\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n\n\t// Option 2: File Upload\n\tfile, _ := os.Open(\"audio.m4a\")\n\tdefer file.Close()\n\tbodyBuf := &bytes.Buffer{}\n\twriter := multipart.NewWriter(bodyBuf)\n\t_ = writer.WriteField(\"webhook_url\", \"https://www.test.requestcatcher.com/test\")\n\tpart, _ := writer.CreateFormFile(\"audio_file\", \"audio.m4a\")\n\tio.Copy(part, file)\n\twriter.Close()\n\n\treq, _ = http.NewRequest(\"POST\", url, bodyBuf)\n\treq.Header.Add(\"Authorization\", \"<<<api key>>>\")\n\treq.Header.Add(\"Content-Type\", writer.FormDataContentType())\n\tres, _ = http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ = io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      }
    ]
  }
},          
"/v1/audio_transcribe": {
  "post": {
    "summary": "Transcribe Audio to Text",
    "description": "Processes an audio file to generate a transcription of the spoken content with support for language detection, translation, and multiple output formats.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the audio file to transcribe.",
                "example": "https://example.com/audio.mp3"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "language": {
                "type": "string",
                "description": "Language spoken in the audio (empty for auto-detection).",
                "example": "en"
              },
              "translate": {
                "type": "boolean",
                "description": "Whether to translate the transcription to English.",
                "example": false
              },
              "transcription_format": {
                "type": "string",
                "description": "Format of the transcribed output.",
                "enum": ["plain_text", "formatted_text", "srt", "vtt"],
                "example": "plain_text"
              },
              "translation_format": {
                "type": "string",
                "description": "Format of the translated output (currently unused).",
                "enum": ["plain_text", "formatted_text", "srt", "vtt"],
                "example": "plain_text"
              },
              "word_timestamps": {
                "type": "boolean",
                "description": "Whether to include word-level timestamps.",
                "example": false
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated transcription",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" },
                "credit_estimate": { "type": "number", "format": "float" },
                "message": { "type": "string" }
              },
              "example": {
                "success": true,
                "task_id": "transcribe123",
                "conversion_id": "conv456",
                "eta": -1,
                "credit_estimate": 100.1,
                "message": "Successfully published to queue"
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_url or audio_file must be provided." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/audio_transcribe\"\nheaders = {\"Authorization\": \"<<<api key>>>\"}\n\n# Option 1: URL\npayload = {\n    \"audio_url\": \"https://example.com/audio.mp3\",\n    \"language\": \"en\",\n    \"translate\": True,\n    \"transcription_format\": \"srt\",\n    \"word_timestamps\": True\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: File Upload\n# payload = {\n#     \"language\": \"en\",\n#     \"translate\": False,\n#     \"transcription_format\": \"plain_text\",\n#     \"word_timestamps\": True\n# }\n# with open(\"audio.mp3\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=payload, files=files)\n# print(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/audio_transcribe';\n$headers = ['Authorization: <<<api key>>>'];\n\n// Option 1: URL\n$data = [\n    'audio_url' => 'https://example.com/audio.mp3',\n    'language' => 'en',\n    'translate' => true,\n    'transcription_format' => 'srt',\n    'word_timestamps' => true\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n\n// Option 2: File Upload\n$data = [\n    'language' => 'en',\n    'translate' => false,\n    'transcription_format' => 'plain_text',\n    'word_timestamps' => true,\n    'audio_file' => new CURLFile('audio.mp3')\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"mime/multipart\"\n\t\"net/http\"\n\t\"os\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/audio_transcribe\"\n\tapiKey := \"<<<api key>>>\"\n\n\t// Option 1: URL\n\tpayload := \"audio_url=https://example.com/audio.mp3&language=en&translate=true&transcription_format=srt&word_timestamps=true\"\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(payload))\n\treq.Header.Add(\"Authorization\", apiKey)\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n\n\t// Option 2: File Upload\n\tfile, _ := os.Open(\"audio.mp3\")\n\tdefer file.Close()\n\tbodyBuf := &bytes.Buffer{}\n\twriter := multipart.NewWriter(bodyBuf)\n\twriter.WriteField(\"language\", \"en\")\n\twriter.WriteField(\"translate\", \"false\")\n\twriter.WriteField(\"transcription_format\", \"plain_text\")\n\twriter.WriteField(\"word_timestamps\", \"true\")\n\tpart, _ := writer.CreateFormFile(\"audio_file\", \"audio.mp3\")\n\tio.Copy(part, file)\n\twriter.Close()\n\n\treq, _ = http.NewRequest(\"POST\", url, bodyBuf)\n\treq.Header.Add(\"Authorization\", apiKey)\n\treq.Header.Add(\"Content-Type\", writer.FormDataContentType())\n\tres, _ = http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ = io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      },
      {
        "lang": "Java",
        "source": "// Java example omitted for brevity. Request if needed."
      }
    ]
  }
},
"/v1/sound_generator": {
  "post": {
    "summary": "Generate Sound Based on Given Prompt",
    "description": "Creates an audio file based on a textual prompt. The generation process is asynchronous and returns a task ID for tracking.",
    "requestBody": {
      "required": true,
      "content": {
        "application/x-www-form-urlencoded": {
          "schema": {
            "type": "object",
            "properties": {
              "prompt": {
                "type": "string",
                "description": "Text prompt guiding the sound generation.",
                "example": "Generate a soothing ambient soundscape."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              },
              "audio_length": {
                "type": "integer",
                "description": "Desired duration of generated audio in seconds (beta feature)",
                "example": 30
              }
            },
            "required": ["prompt"]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated sound generation",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "eta": { "type": "integer" },
                "credit_estimate": { "type": "number", "format": "float" },
                "message": { "type": "string" }
              },
              "example": {
                "success": true,
                "task_id": "soundgen789",
                "conversion_id": "conv456",
                "eta": -1,
                "credit_estimate": 100.1,
                "message": "Successfully published to queue"
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Prompt is required for sound generation." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ]
  }
},
"/v1/audio_mastering": {
  "post": {
    "summary": "Master an audio file using a reference track",
    "description": "Processes an input audio file to match the mastering characteristics of a reference track.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the input audio to be processed.",
                "example": "https://example.com/input_audio.mp3"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Input audio file to upload directly."
              },
              "reference_audio_url": {
                "type": "string",
                "description": "URL of the reference audio file to match.",
                "example": "https://example.com/reference_track.wav"
              },
              "reference_audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Reference audio file to upload directly."
              },
              "output_extension": {
                "type": "string",
                "enum": ["mp3", "wav", "flac", "ogg", "aac", "webm"],
                "description": "Desired output file format.",
                "example": "wav"
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL to receive async result.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "anyOf": [
              { "required": ["audio_url","reference_audio_url"] },
              { "required": ["audio_file","reference_audio_file"] }   
            ]
          
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully queued for mastering",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "credit_estimate": { "type": "number", "format": "float" },
                "eta": { "type": "integer" },
                "message": { "type": "string" }
              },
              "example": {
                "success": true,
                "task_id": "master123",
                "conversion_id": "conv456",
                "credit_estimate": 150.75,
                "eta": 300,
                "message": "Mastering task queued successfully"
              }
            }
          }
        }
      },
      "400": {
        "description": "Invalid parameters",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Invalid output format specified" }
              }
            }
          }
        }
      },
      "401": {
        "description": "Invalid authentication",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Authentication failed" }
              }
            }
          }
        }
      },
      "402": {
        "description": "Insufficient credits",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Insufficient credits for this operation" },
                "required_credits": { "type": "number", "example": 150.75 },
                "available_credits": { "type": "number", "example": 100.0 }
              }
            }
          }
        }
      },
      "404": {
        "description": "User or plan not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "User subscription plan not found" }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal server error during mastering" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/audio_mastering\"\nheaders = {\"Authorization\": \"<<<api key>>>\"}\n\n# Option 1: Using URLs\npayload = {\n    \"audio_url\": \"https://example.com/input_audio.mp3\",\n    \"reference_audio_url\": \"https://example.com/reference_track.wav\",\n    \"output_extension\": \"wav\",\n    \"webhook_url\": \"http://your-webhook-url.com/callback\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: Upload files\n# with open(\"input.mp3\", \"rb\") as input_file, open(\"ref.wav\", \"rb\") as ref_file:\n#     files = {\n#         \"audio_file\": input_file,\n#         \"reference_audio_file\": ref_file\n#     }\n#     data = {\n#         \"output_extension\": \"wav\",\n#         \"webhook_url\": \"http://your-webhook-url.com/callback\"\n#     }\n#     response = requests.post(url, headers=headers, files=files, data=data)\n#     print(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/audio_mastering';\n$headers = ['Authorization: <<<api key>>>'];\n\n// Option 1: URL mode\n$data = [\n    'audio_url' => 'https://example.com/input_audio.mp3',\n    'reference_audio_url' => 'https://example.com/reference_track.wav',\n    'output_extension' => 'wav',\n    'webhook_url' => 'http://your-webhook-url.com/callback'\n];\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;\n\n// Option 2: File Upload\n// $data = [\n//     'audio_file' => new CURLFile('input.mp3'),\n//     'reference_audio_file' => new CURLFile('ref.wav'),\n//     'output_extension' => 'wav',\n//     'webhook_url' => 'http://your-webhook-url.com/callback'\n// ];\n// $ch = curl_init($url);\n// curl_setopt($ch, CURLOPT_POST, true);\n// curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\n// curl_setopt($ch, CURLOPT_POSTFIELDS, $data);\n// curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n// $response = curl_exec($ch);\n// curl_close($ch);\n// echo $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"bytes\"\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/audio_mastering\"\n\ttoken := \"<<<api key>>>\"\n\tdata := \"audio_url=https://example.com/input_audio.mp3&reference_audio_url=https://example.com/reference_track.wav&output_extension=wav&webhook_url=http://your-webhook-url.com/callback\"\n\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(data))\n\treq.Header.Add(\"Authorization\", token)\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      }
    ]
  }
},
"/v1/audio_cutter": {
  "post": {
    "summary": "Cut an audio file between specified timestamps",
    "description": "Trims an audio file using the specified start and end times.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the input audio to be trimmed.",
                "example": "https://example.com/input_audio.mp3"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "start_time": {
                "type": "number",
                "format": "float",
                "description": "Start time in milliseconds.",
                "example": 10500
              },
              "end_time": {
                "type": "number",
                "format": "float",
                "description": "End time in milliseconds.",
                "example": 45000
              },
              "output_extension": {
                "type": "string",
                "enum": ["mp3", "wav", "flac", "ogg", "aac", "webm"],
                "description": "Desired output format.",
                "example": "mp3"
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "required": ["start_time", "end_time"],
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated audio cut",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "conversion_id": { "type": "string" },
                "credit_estimate": { "type": "number", "format": "float" },
                "conversion_path": { "type": "string" },
                "message": { "type": "string" }
              },
              "example": {
                "success": true,
                "conversion_id": "conv789",
                "credit_estimate": 25.0,
                "conversion_path": "https://example.com/trimmed_audio.mp3",
                "message": "Audio trim task queued successfully"
              }
            }
          }
        }
      },
      "400": {
        "description": "Invalid parameters",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Invalid time range specified" }
              }
            }
          }
        }
      },
      "401": {
        "description": "Invalid authentication",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Authentication failed" }
              }
            }
          }
        }
      },
      "402": {
        "description": "Insufficient credits",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Insufficient credits for this operation" },
                "required_credits": { "type": "number", "example": 25.0 },
                "available_credits": { "type": "number", "example": 10.0 }
              }
            }
          }
        }
      },
      "404": {
        "description": "User or plan not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "User subscription plan not found" }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal server error during audio trimming" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/audio_cutter\"\nheaders = {\"Authorization\": \"<API_KEY>\"}\n\n# Option 1: Using audio URL\npayload = {\n    \"audio_url\": \"https://example.com/input_audio.mp3\",\n    \"start_time\": 10500,\n    \"end_time\": 45000,\n    \"output_extension\": \"mp3\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: Upload local audio file\npayload = {\n    \"start_time\": 5000,\n    \"end_time\": 20000,\n    \"output_extension\": \"wav\"\n}\nwith open(\"input_audio.mp3\", \"rb\") as f:\n    files = {\"audio_file\": f}\n    response = requests.post(url, headers=headers, data=payload, files=files)\nprint(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/audio_cutter';\n$headers = ['Authorization: <API_KEY>'];\n\n$data = [\n    'audio_url' => 'https://example.com/input_audio.mp3',\n    'start_time' => 10500,\n    'end_time' => 45000,\n    'output_extension' => 'mp3'\n];\n\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/audio_cutter\"\n\ttoken := \"<API_KEY>\"\n\tdata := \"audio_url=https://example.com/input_audio.mp3&start_time=10500&end_time=45000&output_extension=mp3\"\n\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(data))\n\treq.Header.Add(\"Authorization\", token)\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      },
      {
        "lang": "Java",
        "source": "// Java version omitted for brevity; request if needed."
      }
    ]
  }
},
"/v1/audio_speed_changer": {
  "post": {
    "summary": "Change the speed of an audio file",
    "description": "Processes an audio file to change its playback speed based on a speed factor.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the input audio to change speed.",
                "example": "https://example.com/input_audio.mp3"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "speed_change_factor": {
                "type": "number",
                "description": "Factor to change the audio speed (min: 0.25, max: 4.0)",
                "minimum": 0.25,
                "maximum": 4.0,
                "example": 1.5
              },
              "output_extension": {
                "type": "string",
                "enum": ["mp3", "wav", "flac", "ogg", "aac", "webm"],
                "description": "Desired output format.",
                "example": "mp3"
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "http://your-webhook-url.com/callback"
              }
            },
            "required": ["speed_change_factor"],
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated audio speed change",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "conversion_id": { "type": "string" },
                "credit_estimate": { "type": "number", "format": "float" },
                "conversion_path": { "type": "string" },
                "message": { "type": "string" }
              },
              "example": {
                "success": true,
                "conversion_id": "conv999",
                "credit_estimate": 45.0,
                "conversion_path": "https://example.com/output/converted_audio.mp3",
                "message": "Speed change task queued successfully"
              }
            }
          }
        }
      },
      "400": {
        "description": "Invalid parameters",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Invalid speed_change_factor" }
              }
            }
          }
        }
      },
      "401": {
        "description": "Invalid authentication",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Authentication failed" }
              }
            }
          }
        }
      },
      "402": {
        "description": "Insufficient credits",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Insufficient credits for this operation" },
                "required_credits": { "type": "number", "example": 45.0 },
                "available_credits": { "type": "number", "example": 30.0 }
              }
            }
          }
        }
      },
      "404": {
        "description": "User or plan not found",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "User subscription plan not found" }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal server error during processing" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/audio_speed_changer\"\nheaders = {\"Authorization\": \"<API_KEY>\"}\n\n# Option 1: Use audio URL\npayload = {\n    \"audio_url\": \"https://example.com/input_audio.mp3\",\n    \"speed_change_factor\": 1.5,\n    \"output_extension\": \"mp3\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: Upload local audio file\npayload = {\n    \"speed_change_factor\": 1.25,\n    \"output_extension\": \"wav\"\n}\nwith open(\"input_audio.mp3\", \"rb\") as f:\n    files = {\"audio_file\": f}\n    response = requests.post(url, headers=headers, data=payload, files=files)\nprint(response.json())"
      },
      {
        "lang": "PHP",
        "source": "<?php\n$url = 'https://api.musicgpt.com/api/public/v1/audio_speed_changer';\n$headers = ['Authorization: <API_KEY>'];\n\n$data = [\n    'audio_url' => 'https://example.com/input_audio.mp3',\n    'speed_change_factor' => 1.5,\n    'output_extension' => 'mp3'\n];\n\n$ch = curl_init($url);\ncurl_setopt($ch, CURLOPT_POST, true);\ncurl_setopt($ch, CURLOPT_HTTPHEADER, $headers);\ncurl_setopt($ch, CURLOPT_POSTFIELDS, $data);\ncurl_setopt($ch, CURLOPT_RETURNTRANSFER, true);\n$response = curl_exec($ch);\ncurl_close($ch);\necho $response;"
      },
      {
        "lang": "Go",
        "source": "package main\n\nimport (\n\t\"fmt\"\n\t\"io\"\n\t\"net/http\"\n\t\"strings\"\n)\n\nfunc main() {\n\turl := \"https://api.musicgpt.com/api/public/v1/audio_speed_changer\"\n\ttoken := \"<API_KEY>\"\n\tdata := \"audio_url=https://example.com/input_audio.mp3&speed_change_factor=1.5&output_extension=mp3\"\n\n\treq, _ := http.NewRequest(\"POST\", url, strings.NewReader(data))\n\treq.Header.Add(\"Authorization\", token)\n\tres, _ := http.DefaultClient.Do(req)\n\tdefer res.Body.Close()\n\tbody, _ := io.ReadAll(res.Body)\n\tfmt.Println(string(body))\n}"
      },
      {
        "lang": "Java",
        "source": "// Java version omitted for brevity; request if needed."
      }
    ]
  }
},
"/v1/audio_to_midi": {
  "post": {
    "summary": "Convert Audio to MIDI",
    "description": "Processes an audio file and converts it into a MIDI file. Optionally generates a sonified .wav and/or a CSV of note events. This request is handled asynchronously.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the audio file to convert to MIDI.",
                "example": "https://example.com/audio.mp3"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and process directly."
              },
              "sonify_midi": {
                "type": "boolean",
                "default": true,
                "description": "If true, generates a .wav file that sonifies the MIDI output."
              },
              "save_note_events": {
                "type": "boolean",
                "default": true,
                "description": "If true, saves predicted note events as a CSV file."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL to receive conversion results.",
                "example": "https://your-webhook-url.com/callback"
              }
            },
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "MIDI conversion task initiated successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": true },
                "task_id": { "type": "string", "example": "task789" },
                "message": {
                  "type": "string",
                  "example": "MIDI conversion task queued successfully"
                }
              }
            }
          }
        }
      },
      "400": {
        "description": "Invalid request parameters",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": {
                  "type": "string",
                  "example": "Missing or invalid audio_url"
                }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": {
                  "type": "string",
                  "example": "Error during MIDI conversion"
                }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/audio_to_midi\"\nheaders = {\"Authorization\": \"<<<api key>>>\"}\n\n# Option 1: Use audio URL\npayload = {\n    \"audio_url\": \"https://example.com/audio_file.wav\",\n    \"sonify_midi\": True,\n    \"save_note_events\": True,\n    \"webhook_url\": \"https://your-webhook-url.com/callback\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: Upload local audio file\npayload = {\n    \"sonify_midi\": True,\n    \"save_note_events\": True,\n    \"webhook_url\": \"https://your-webhook-url.com/callback\"\n}\nwith open(\"audio.wav\", \"rb\") as f:\n    files = {\"audio_file\": f}\n    response = requests.post(url, headers=headers, data=payload, files=files)\nprint(response.json())"
      }
    ]
  }
},
"/v1/Remix": {
  "post": {
    "summary": "Remix Audio Using Prompt and Optional Lyrics",
    "description": "This endpoint allows users to remix an input audio file or URL using a descriptive prompt, optional lyrics, and a gender selection for vocal tone.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Uploaded audio file to be remixed."
              },
              "audio_url": {
                "type": "string",
                "description": "URL or S3 path to the input audio.",
                "example": "https://mybucket.s3.amazonaws.com/song.mp3"
              },
              "prompt": {
                "type": "string",
                "description": "Describes how the audio should be transformed.",
                "example": "Make it sound like Lo-fi with chill beats"
              },
              "lyrics": {
                "type": "string",
                "description": "Optional lyrics to guide vocal generation.",
                "example": "It's a brand new day",
                "maxLength": 2000
              },
              "gender": {
                "type": "string",
                "description": "Voice style if vocal content is generated.",
                "enum": ["male", "female", "neutral"],
                "example": "female"
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "https://example.com/my-webhook"
              }
            },
            "required": ["prompt"],
            "anyOf": [              
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated remix task",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id_1": { "type": "string" },
                "conversion_id_2": { "type": "string" },
                "eta": { "type": "integer", "description": "Estimated processing time in seconds" },
                "credit_estimate": { "type": "number", "format": "float" },
                "message": { "type": "string" }
              },
              "example": {
                "success": true,
                "message": "Remix request submitted successfully",
                "task_id": "task-remix-001",
                "conversion_id_1": "remix-a1b2",
                "conversion_id_2": "remix-c3d4",
                "eta": 42,
                "credit_estimate": 47.5
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_file or audio_url must be provided." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/Remix\"\nheaders = {\"Authorization\": \"<API_KEY>\"}\ndata = {\n  \"prompt\": \"Make it sound like Lo-fi with chill beats\",\n  \"lyrics\": \"It's a brand new day\",\n  \"gender\": \"female\",\n  \"webhook_url\": \"https://example.com/my-webhook\"\n}\n\n# Option 1: audio_url\nfiles = {}\ndata[\"audio_url\"] = \"https://mybucket.s3.amazonaws.com/song.mp3\"\nresponse = requests.post(url, headers=headers, data=data, files=files)\n\n# Option 2: File Upload\nwith open(\"song.mp3\", \"rb\") as f:\n    files = {\"audio_file\": f}\n    response = requests.post(url, headers=headers, data=data, files=files)\n\nprint(response.json())"
      }
    ]
  }
},
"/v1/extend": {
  "post": {
    "summary": "Extend Audio Using Prompt and Optional Lyrics",
    "description": "This endpoint allows users to extend an existing audio file or stream by appending new audio content after a specific timestamp. The new audio is generated using a prompt (e.g., describing the desired sound) and optional lyrics.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Uploaded audio file to be extended."
              },
              "audio_url": {
                "type": "string",
                "description": "URL or S3 path to the input audio.",
                "example": "https://mybucket.s3.amazonaws.com/song.mp3"
              },
              "extend_after": {
                "type": "number",
                "format": "float",
                "description": "Time in seconds after which to start the extension.",
                "example": 35.0
              },
              "prompt": {
                "type": "string",
                "description": "Describes how the extended section should sound.",
                "example": "Add a calming piano outro"
              },
              "lyrics": {
                "type": "string",
                "description": "Original lyrics of song",
                "example": "Let the journey fade away",
                "maxLength": 2000
              },
              "lyrics_section_to_extend":{
                "type": "string",
                "description": "Lyrics to be used for the extended portion(optional, max 3000 characters).",
                "maxLength": 3000
              },
              "gender": {
                "type": "string",
                "description": "Voice style if vocal content is generated.",
                "enum": ["male", "female", "neutral"],
                "example": "neutral"
              },
              "num_outputs": {
                      "type": "number",
                      "format":"integer",
                      "description" : "The number of outputs to generate (1 or 2 only):default is 2."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "https://example.com/webhook"
              }
            },
            "required": ["extend_after"],
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
              
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated extend task",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "message": { "type": "string" },
                "task_id": { "type": "string" },
                "conversion_id_1": { "type": "string" },
                "conversion_id_2": { "type": "string" },
                "eta": { "type": "integer", "description": "Estimated processing time in seconds" },
                "credit_estimate": { "type": "number", "format": "float" }
              },
              "example": {
                "success": true,
                "message": "Extend request submitted successfully",
                "task_id": "task-extend-789",
                "conversion_id_1": "extend-a1b2",
                "conversion_id_2": "extend-c3d4",
                "eta": 38,
                "credit_estimate": 42.0
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "audio_file or audio_url and extend_after are required." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/extend\"\nheaders = {\"Authorization\": \"<API_KEY>\"}\ndata = {\n  \"extend_after\": 35.0,\n  \"prompt\": \"Add a calming piano outro\",\n  \"lyrics\": \"Let the journey fade away\",\n  \"gender\": \"neutral\", \n  \"lyrics_section_to_extend\": \"New lyrics\",\n  \"num_outputs\": 1,\n  \"webhook_url\": \"https://example.com/webhook\"\n}\n\n# Option 1: audio_url\ndata[\"audio_url\"] = \"https://mybucket.s3.amazonaws.com/song.mp3\"\nresponse = requests.post(url, headers=headers, data=data)\n\n# Option 2: File Upload\n# with open(\"song.mp3\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=data, files=files)\n\n# print(response.json())"
      }
    ]
  }
},
"/v1/inpaint": {
  "post": {
    "summary": "Inpaint an Audio Segment",
    "description": "This endpoint allows users to replace a specific time segment of an audio clip using a textual prompt and optional lyrics. The inpainting operation blends new audio content into the selected range, guided by user-defined style and voice preferences.  \n\nTo use the inpaint feature, upload a song and specify the lyrics you want to replace in the field **'lyrics_section_to_replace'**. For best results, also provide the complete song lyrics in the **lyrics**.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Uploaded input audio file."
              },
              "audio_url": {
                "type": "string",
                "description": "URL or S3 path to the input audio.",
                "example": "https://mybucket.s3.amazonaws.com/song.mp3"
              },
              "prompt": {
                "type": "string",
                "description": "A description of how the replacement should sound.",
                "example": "Replace this part with an opera-style vocal."
              },
              "replace_start_at": {
                "type": "number",
                "format": "float",
                "description": "Time in seconds to start replacing audio.",
                "example": 12.5
              },
              "replace_end_at": {
                "type": "number",
                "format": "float",
                "description": "Time in seconds to stop replacing audio.",
                "example": 20.0
              },
              "lyrics": {
                "type": "string",
                "description": "Lyrics to be used for inpainting.",
                "example": "This is where my story begins"
 
              },
              "lyrics_section_to_replace":{
                "type": "string",
                "description":"Lyrics to be used for the replaced portion(optional, max 3000 characters)",
                "maxLength": 2000
              },
              "gender": {
                "type": "string",
                "description": "Voice style for the inpainted segment.",
                "enum": ["male", "female", "neutral"],
                "example": "male"
              },
              "num_outputs": {
                      "type": "number",
                      "format":"integer",
                      "description" : "The number of outputs to generate (1 or 2 only):default is 2."
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results.",
                "example": "https://example.com/webhook"
              }
            },
            "required": ["prompt", "replace_start_at", "replace_end_at"],
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated inpaint task",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "message": { "type": "string" },
                "task_id": { "type": "string" },
                "conversion_id_1": { "type": "string" },
                "conversion_id_2": { "type": "string" },
                "eta": { "type": "integer", "description": "Estimated processing time in seconds" },
                "credit_estimate": { "type": "number", "format": "float" }
              },
              "example": {
                "success": true,
                "message": "Inpaint request submitted successfully",
                "task_id": "task-xyz-123",
                "conversion_id_1": "inpaint-abc",
                "conversion_id_2": "inpaint-def",
                "eta": 40,
                "credit_estimate": 45.0
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "audio_file or audio_url and valid replace range are required." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/inpaint\"\nheaders = {\"Authorization\": \"<API_KEY>\"}\ndata = {\n  \"prompt\": \"Add a soft guitar solo here\",\n  \"replace_start_at\": 12.5,\n  \"replace_end_at\": 20.0,\n  \"lyrics\": \"This is where my story begins\",\n  \"lyrics_section_to_replace\": \"New lyrics\",\n  \"gender\": \"male\",\n  \"num_outputs\": 1,\n  \"webhook_url\": \"https://example.com/webhook\"\n}\n\n# Option 1: audio_url\ndata[\"audio_url\"] = \"https://mybucket.s3.amazonaws.com/song.mp3\"\nresponse = requests.post(url, headers=headers, data=data)\n\n# Option 2: File Upload\n# with open(\"song.mp3\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=data, files=files)\n\n# print(response.json())"
      }
    ]
  }
},
"/v1/sing_over_instrumental": {
  "post": {
    "summary": "Sing Over Instrumental Using Prompt and Lyrics",
    "description": "This endpoint allows users to sing over an instrumental audio track using a text prompt and lyrics. It supports either a file upload or a URL to the input audio and generates a vocal overlay based on the provided lyrics and style.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {

            "type": "object",
            "properties": {
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Uploaded instrumental audio file."
              },
              "audio_url": {
                "type": "string",
                "description": "URL or S3 path to the input instrumental audio.",
                "example": "https://bucket.s3.amazonaws.com/audio.mp3"
              },
              "prompt": {
                "type": "string",
                "description": "Description of the singing style, tone, or genre.",
                "example": "Sing emotional vocals over a soft piano instrumental."
              },
              "lyrics": {
                "type": "string",
                "description": "The lyrics to be sung over the instrumental.",
                "example": "Never mind I'll find someone like you...",
                "maxLength": 2000
              },
              "gender": {
                "type": "string",
                "description": "Voice gender to guide generation.",
                "enum": ["male", "female", "neutral"],
                "example": "female"
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL to receive status updates or final audio result.",
                "example": "https://yourdomain.com/webhook"
              }
            },
            "required": ["prompt", "lyrics"],
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated sing over instrumental task",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "message": { "type": "string" },
                "task_id": { "type": "string" },
                "conversion_id_1": { "type": "string" },
                "conversion_id_2": { "type": "string" },
                "eta": { "type": "integer", "description": "Estimated processing time in seconds" },
                "credit_estimate": { "type": "number", "format": "float" }
              },
              "example": {
                "success": true,
                "message": "Sing Over Instrumental request submitted successfully",
                "task_id": "task-abcde12345",
                "conversion_id_1": "over-instrumental-1",
                "conversion_id_2": "over-instrumental-2",
                "eta": 45,
                "credit_estimate": 50.0
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_file or audio_url must be provided, along with prompt and lyrics." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/sing_over_instrumental\"\nheaders = {\"Authorization\": \"<API_KEY>\"}\ndata = {\n  \"prompt\": \"Sing emotional vocals over a soft piano instrumental.\",\n  \"lyrics\": \"Never mind I'll find someone like you...\",\n  \"gender\": \"female\",\n  \"webhook_url\": \"https://yourdomain.com/webhook\"\n}\n\n# Option 1: Use audio_url\ndata[\"audio_url\"] = \"https://bucket.s3.amazonaws.com/audio.mp3\"\nresponse = requests.post(url, headers=headers, data=data)\n\n# Option 2: Upload file\n# with open(\"audio.mp3\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=data, files=files)\n\n# print(response.json())"
      }
    ]
  }
},

"/v1/file_convert": {
  "post": {
    "summary": "Convert audio file to different format",
    "description": "Initiate a file conversion task using either an audio URL or file upload with optional format parameters and webhook callback.",
    "requestBody": {
      "required": true,
      "content": {
        "multipart/form-data": {
          "schema": {
            "type": "object",
            "properties": {
              "audio_url": {
                "type": "string",
                "description": "URL of the audio file to convert",
                "example": "https://example.com/audio.mp3"
              },
              "audio_file": {
                "type": "string",
                "format": "binary",
                "description": "Audio file to upload and convert directly"
              },
              "target_format": {
                "type": "string",
                "description": "Target format for conversion",
                "enum": ["mp3", "wav", "flac", "ogg", "aac", "webm"],
                "example": "wav"
              },
              "target_sr": {
                "type": "integer",
                "description": "Target sample rate in Hz (optional) - can be any of [8000, 16000, 22050, 24000, 32000, 44100, 48000, 96000, 192000]",
                "enum": [8000, 16000, 22050, 24000, 32000, 44100, 48000, 96000, 192000],
                "default": 44100,
                "example": 44100
              },
              "target_bit_depth": {
                "type": "integer",
                "description": "Target bit depth (16, 24, or 32)",
                "enum": [16, 24, 32],
                "example": 24
              },
              "webhook_url": {
                "type": "string",
                "description": "Callback URL for async processing results",
                "example": "https://your-webhook-url.com/callback"
              }
            },
            "required": ["target_format"],
            "anyOf": [
              { "required": ["audio_url"] },
              { "required": ["audio_file"] }
            ]
          }
        }
      }
    },
    "responses": {
      "200": {
        "description": "Successfully initiated file conversion",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "conversion_id": { "type": "string" },
                "output_path": { "type": "string" },
                "credit_estimate": { "type": "number", "format": "float" }
              },
              "example": {
                "success": true,
                "task_id": "convert789",
                "conversion_id": "conv456",
                "output_path": "https://storage.example.com/converted/audio.wav",
                "credit_estimate": 100.1
              }
            }
          }
        }
      },
      "422": {
        "description": "Validation Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Either audio_url or audio_file must be provided" }
              }
            }
          }
        }
      },
      "500": {
        "description": "Server Error",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ],
    "x-codeSamples": [
      {
        "lang": "Python",
        "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/file_convert\"\nheaders = {\n    \"Authorization\": \"<<<api key>>>\"\n}\n\n# Option 1: URL\npayload = {\n    \"audio_url\": \"https://example.com/audio.mp3\",\n    \"target_format\": \"wav\",\n    \"target_sr\": 44100,\n    \"webhook_url\": \"https://your-webhook-url.com/callback\"\n}\nresponse = requests.post(url, headers=headers, data=payload)\nprint(response.json())\n\n# Option 2: File Upload\n# payload = {\n#     \"target_format\": \"flac\",\n#     \"target_bit_depth\": 24,\n#     \"webhook_url\": \"https://your-webhook-url.com/callback\"\n# }\n# with open(\"audio.mp3\", \"rb\") as f:\n#     files = {\"audio_file\": f}\n#     response = requests.post(url, headers=headers, data=payload, files=files)\n# print(response.json())"
      }
    ]
  }
},
"/v1/prompt_to_lyrics": {
  "get": {
    "summary": "Convert Prompt to Lyrics",
    "description": "This endpoint takes a natural language prompt (e.g., a theme, vibe, or idea) and generates original lyrics based on it. If the prompt has been used before, a variation may be returned. It also estimates the credit cost of generation.",
    "parameters": [
      {
        "name": "prompt",
        "in": "query",
        "required": true,
        "description": "The theme or idea you'd like lyrics generated for.",
        "schema": {
          "type": "string",
          "minLength": 1,
          "maxLength": 1000,
          "example": "A hopeful song about starting over"
        }
      }
    ],
    "responses": {
      "200": {
        "description": "Lyrics generated successfully",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean" },
                "task_id": { "type": "string" },
                "message": { "type": "string" },
                "lyrics": { "type": "string" },
                "credit_estimate": { "type": "integer" }
              },
              "example": {
                "success": true,
                "task_id": "task-lyrics-2345",
                "message": "Lyrics generated successfully",
                "lyrics": "Under the silver moonlight we sway...\n...\n",
                "credit_estimate": 10
              }
            }
          }
        }
      },
      "400": {
        "description": "Invalid prompt input",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Prompt must be between 1 and 1000 characters." }
              }
            }
          }
        }
      },
      "500": {
        "description": "Internal server error during lyrics generation",
        "content": {
          "application/json": {
            "schema": {
              "type": "object",
              "properties": {
                "success": { "type": "boolean", "example": false },
                "error": { "type": "string", "example": "Internal Server Error" }
              }
            }
          }
        }
      }
    },
    "security": [
      { "ApiKeyAuth": [] }
    ]
  }
},
"/v1/image_to_song": {
    "post": {
      "summary": "Generate a Song from an Image",
      "description": "Generate a song from an image by analyzing it and creating music based on visual content. The process can optionally include custom lyrics, voice conversion, and various musical parameters.",
      "requestBody": {
        "required": true,
        "content": {
          "multipart/form-data": {
            "schema": {
              "type": "object",
              "properties": {
                "image_file": {
                  "type": "string",
                  "format": "binary",
                  "description": "Image file to upload and analyze. Supported formats: JPEG, PNG, GIF, BMP, WEBP."
                },
                "image_url": {
                  "type": "string",
                  "description": "URL of the image to analyze. Either this or image_file must be provided.",
                  "example": "https://mybucket.s3.amazonaws.com/image.png"
                },
                "prompt": {
                  "type": "string",
                  "description": "Additional prompt to guide the song generation from the image.",
                  "maxLength": 300,
                  "example": "Generate a relaxing acoustic track inspired by this scene."
                },
                "lyrics": {
                  "type": "string",
                  "description": "Custom lyrics to include in the generated audio.",
                  "maxLength": 3000,
                  "example": "Let the colors of the sunset fill your heart."
                },
                "negative_tags": {
                  "type": "string",
                  "description": "Tags or themes to avoid in the song.",
                  "example": "no heavy metal, avoid loud drums"
                },
                "make_instrumental": {
                  "type": "boolean",
                  "description": "Generate instrumental output only. Lyrics will be ignored.",
                  "default": false
                },
                "vocal_only": {
                  "type": "boolean",
                  "description": "Generate vocal-only output.",
                  "default": false
                },
                "key": {
                  "type": "string",
                  "description": "Musical key for the song.",
                  "example": "C major"
                },
                "bpm": {
                  "type": "integer",
                  "description": "Beats per minute for the song tempo. Defaults to 0 (auto-selected).",
                  "default": 0
                },
                "webhook_url": {
                  "type": "string",
                  "description": "Optional callback URL for async processing results.",
                  "example": "https://example.com/webhook"
                },
                "voice_id": {
                  "type": "string",
                  "description": "Voice ID for converting the generated audio. Cannot be used with vocal_only mode."
                }
              },
              "anyOf": [
                { "required": ["image_file"] },
                { "required": ["image_url"] }
              ]
            }
          }
        }
      },
      "responses": {
        "200": {
          "description": "Successfully initiated image-to-song task",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "success": { "type": "boolean" },
                  "message": { "type": "string" },
                  "task_id": { "type": "string" },
                  "conversion_id_1": { "type": "string" },
                  "conversion_id_2": { "type": "string" },
                  "eta": { "type": "integer", "description": "Estimated processing time in seconds" },
                  "credit_estimate": { "type": "number", "format": "float" }
                },
                "example": {
                  "success": true,
                  "message": "Message Published To Queue",
                  "task_id": "task_12345",
                  "conversion_id_1": "conv_12345",
                  "conversion_id_2": "conv_54321",
                  "eta": 300,
                  "credit_estimate": 150.5
                }
              }
            }
          }
        },
        "422": {
          "description": "Validation Error / Unprocessable Content",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "success": { "type": "boolean", "example": false },
                  "error": { "type": "string", "example": "image_file or image_url is required." }
                }
              }
            }
          }
        },
        "500": {
          "description": "Internal Server Error",
          "content": {
            "application/json": {
              "schema": {
                "type": "object",
                "properties": {
                  "success": { "type": "boolean", "example": false },
                  "error": { "type": "string", "example": "Internal Server Error" }
                }
              }
            }
          }
        }
      },
      "security": [
        { "ApiKeyAuth": [] }
      ],
      "x-codeSamples": [
        {
          "lang": "Python",
          "source": "import requests\n\nurl = \"https://api.musicgpt.com/api/public/v1/image_to_song\"\nheaders = {\"Authorization\": \"<API_KEY>\"}\ndata = {\n    \"image_url\": \"https://mybucket.s3.amazonaws.com/image.png\",\n    \"prompt\": \"Generate a relaxing acoustic track inspired by this scene.\",\n    \"lyrics\": \"Let the colors of the sunset fill your heart.\",\n    \"make_instrumental\": False,\n    \"vocal_only\": False,\n    \"key\": \"C major\",\n    \"bpm\": 120,\n    \"webhook_url\": \"https://example.com/webhook\",\n    \"voice_id\": \"voice_123\"\n}\n\n# Option 1: Using image URL\nresponse = requests.post(url, headers=headers, data=data)\nprint(response.json())\n\n# Option 2: Uploading a local image file\n# with open(\"image.png\", \"rb\") as f:\n#     files = {\"image_file\": f}\n#     response = requests.post(url, headers=headers, data=data, files=files)\n#     print(response.json())"
        }
      ]
    }
  }
},
  "components": {
    "securitySchemes": {
      "ApiKeyAuth": {
        "type": "apiKey",
        "in": "header",
        "name": "Authorization"
      }
    }
  }
}