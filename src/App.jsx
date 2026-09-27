import { useEffect, useRef, useState } from "react";
import "./App.css";
import birthdayAudio from "./assets/audio/Birthday.mp3";
import memoryAudio from "./assets/audio/Memory.mp3";
import letterAudio from "./assets/audio/Letter.mp3";
import birthdayGirlCake from "./assets/images/birthday-girl.png";
import babyOnePhoto from "./assets/images/baby-one.png";
import babyFourPhoto from "./assets/images/baby-four.png";
import schoolGangOnePhoto from "./assets/images/school-gang-one.png";
import schoolGangTwoPhoto from "./assets/images/school-gang-two.png";
import schoolTrioOnePhoto from "./assets/images/school-trio-one.png";
import schoolTrioTwoPhoto from "./assets/images/school-trio-two.png";
import jigsawPhoto from "./assets/images/jigsaw-photo.png";
import sleepingPhoto from "./assets/images/sleeping-photo.png";
import blackDressPhoto from "./assets/images/black-dress.jpg";
import modernDressPhoto1 from "./assets/images/modern-dress-1.png";
import modernDressPhoto2 from "./assets/images/modern-dress-2.png";
import sisterPhoto from "./assets/images/sister-photo.png";
import brotherPhoto from "./assets/images/brother-photo.png";
import familyPhoto from "./assets/images/family-photo.png";
import collegeSareePhoto from "./assets/images/self.jpg";
import collegeCollage1 from "./assets/images/collage-1.jpg";
import collegeCollage2 from "./assets/images/collage-2.jpg";
import friendsPhoto from "./assets/images/friends-photo.jpg";
import lastYearBirthdayPhoto from "./assets/images/last-year.png";
import finalBirthdayPhoto from "./assets/images/final-photo.png";

function App() {
  const [started, setStarted] = useState(false);

  const [pin, setPin] = useState("");
  const [unlocked, setUnlocked] = useState(false);

  const [wrongPin, setWrongPin] = useState(false);

  const [eyebrowText, setEyebrowText] = useState("");
  const [titleLine1, setTitleLine1] = useState("");
  const [titleLine2, setTitleLine2] = useState("");
  const [subtitleText, setSubtitleText] = useState("");
  const [nameText, setNameText] = useState("");
  const [showButton, setShowButton] = useState(false);

  /* =================================
     BIRTHDAY STATES
  ================================= */

  const [birthdayStarted, setBirthdayStarted] = useState(false);
  const [countdown, setCountdown] = useState(null);
  const [showBlowMessage, setShowBlowMessage] = useState(false);

  const [candleBlown, setCandleBlown] = useState(false);
  const [showSmoke, setShowSmoke] = useState(false);
  const [showBirthdayPhoto, setShowBirthdayPhoto] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [micError, setMicError] = useState(false);

  const [showGift, setShowGift] = useState(false);
  const [giftOpened, setGiftOpened] = useState(false);

  const [showMemories, setShowMemories] = useState(false);
  const [memoryStep, setMemoryStep] = useState(0);

  const [letterOpened, setLetterOpened] = useState(false);

  const [birthdaySmallText, setBirthdaySmallText] = useState("");
  const [birthdayTitle, setBirthdayTitle] = useState("");
  const [birthdayName, setBirthdayName] = useState("");
  const [showBirthdayBegin, setShowBirthdayBegin] = useState(false);

  /* =================================
    JIGSAW
  ================================= */

  const [jigsawOrder, setJigsawOrder] = useState([
    3, 0, 7,
    2, 8, 1,
    6, 4, 5,
  ]);

  const [selectedJigsawPiece, setSelectedJigsawPiece] = useState(null);
  const [jigsawSolved, setJigsawSolved] = useState(false);

  /* =================================
     AUDIO REFS
  ================================= */

  const audioRef = useRef(null);
  const memoryAudioRef = useRef(null);
  const letterAudioRef = useRef(null);
  

  /* =================================
     MICROPHONE REFS
  ================================= */

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const microphoneRef = useRef(null);
  const animationFrameRef = useRef(null);

  /* =================================
     INTRO TYPING
  ================================= */

  useEffect(() => {
    const texts = [
      {
        text: "A Little Something For You",
        setter: setEyebrowText,
      },
      {
        text: "Some Birthdays",
        setter: setTitleLine1,
      },
      {
        text: "Are Remembered..",
        setter: setTitleLine2,
      },
      {
        text: "Some Are Made Into Something You Can Keep..",
        setter: setSubtitleText,
      },
      {
        text: "This One Is For You, Jerry..",
        setter: setNameText,
      },
    ];

    let currentText = 0;
    let charIndex = 0;
    let timeout;

    const typeNext = () => {
      if (currentText >= texts.length) {
        setShowButton(true);
        return;
      }

      const current = texts[currentText];

      if (charIndex < current.text.length) {
        charIndex++;

        current.setter(
          current.text.slice(0, charIndex)
        );

        timeout = setTimeout(typeNext, 55);
      } else {
        currentText++;
        charIndex = 0;

        timeout = setTimeout(typeNext, 500);
      }
    };

    timeout = setTimeout(typeNext, 700);

    return () => clearTimeout(timeout);
  }, []);

  /* =================================
   BIRTHDAY INTRO TYPING
================================= */


useEffect(() => {
  if (!unlocked) return;

  const texts = [
    {
      text: "AND NOW..",
      setter: setBirthdaySmallText,
    },
    {
      text: "Happy 21st Birthday",
      setter: setBirthdayTitle,
    },
    {
      text: "Jerry !!",
      setter: setBirthdayName,
    },
  ];

  let currentText = 0;
  let charIndex = 0;
  let timeout;

  const typeNext = () => {
    if (currentText >= texts.length) {
      setShowBirthdayBegin(true);
      return;
    }

    const current = texts[currentText];

    if (charIndex < current.text.length) {
      charIndex++;

      current.setter(
        current.text.slice(0, charIndex)
      );

      timeout = setTimeout(typeNext, 65);
    } else {
      currentText++;
      charIndex = 0;

      timeout = setTimeout(typeNext, 500);
    }
  };

  timeout = setTimeout(typeNext, 500);

  return () => clearTimeout(timeout);
}, [unlocked]);

  /* =================================
     PIN
  ================================= */

  const handlePinInput = (number) => {
  if (pin.length >= 4 || unlocked) return;

  setWrongPin(false);
  setPin((prev) => prev + number);
};

const handlePinEnter = () => {
  if (pin.length !== 4 || unlocked) return;

  if (pin === "2809") {
    setTimeout(() => {
      setUnlocked(true);
    }, 300);
  } else {
    setWrongPin(true);

    setTimeout(() => {
      setPin("");
      setWrongPin(false);
    }, 700);
  }
};

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setWrongPin(false);
  };

  /* =================================
     START BIRTHDAY
  ================================= */

  const startBirthday = () => {
    setBirthdayStarted(true);

    setTimeout(() => {
      setCountdown(3);
    }, 1200);
  };

    const fadeOutAudio = (audio, duration = 1200) => {
    if (!audio) return;

    const startVolume = audio.volume;
    const steps = 20;
    const stepTime = duration / steps;

    let step = 0;

    const fade = setInterval(() => {
      step++;

      audio.volume = Math.max(
        0,
        startVolume * (1 - step / steps)
      );

      if (step >= steps) {
        clearInterval(fade);

        audio.pause();
        audio.currentTime = 0;
        audio.volume = startVolume;
      }
    }, stepTime);
  };

    const startMemoryMusic = () => {
    const audio = memoryAudioRef.current;

    if (!audio) return;

    audio.currentTime = 0;
    audio.volume = 0;

    audio.play().catch(() => {
      console.log("Memory audio waiting for user interaction.");
    });

    const targetVolume = 0.28;
    const steps = 20;
    const stepTime = 100;

    let step = 0;

    const fadeIn = setInterval(() => {
      step++;

      audio.volume = Math.min(
        targetVolume,
        targetVolume * (step / steps)
      );

      if (step >= steps) {
        clearInterval(fadeIn);
      }
    }, stepTime);
  };

  useEffect(() => {
  const audio = memoryAudioRef.current;

  if (!audio) return;

  const handleEnded = () => {
    audio.currentTime = 0;

    audio.play().catch(() => {});
  };

  audio.addEventListener("ended", handleEnded);

  return () => {
    audio.removeEventListener("ended", handleEnded);
  };
}, []);

/* =================================
   JIGSAW FUNCTIONS
================================= */

const solvedJigsawOrder = [
  0, 1, 2,
  3, 4, 5,
  6, 7, 8,
];

const swapJigsawPieces = (firstSlot, secondSlot) => {
  if (
    firstSlot === secondSlot ||
    firstSlot === null ||
    secondSlot === null
  ) {
    return;
  }

  setJigsawOrder((current) => {
    const next = [...current];

    [next[firstSlot], next[secondSlot]] = [
      next[secondSlot],
      next[firstSlot],
    ];

    const solved = next.every(
      (piece, index) =>
        piece === solvedJigsawOrder[index]
    );

    if (solved) {
      setJigsawSolved(true);
    }

    return next;
  });
};


/* =================================
   TAP TO SWAP
================================= */

const handleJigsawTap = (slotIndex) => {
  if (jigsawSolved) return;

  if (selectedJigsawPiece === null) {
    setSelectedJigsawPiece(slotIndex);
    return;
  }

  if (selectedJigsawPiece === slotIndex) {
    setSelectedJigsawPiece(null);
    return;
  }

  swapJigsawPieces(
    selectedJigsawPiece,
    slotIndex
  );

  setSelectedJigsawPiece(null);
};

/* =================================
   POINTER DRAG
================================= */

const handleJigsawPointerDown = (
  event,
  slotIndex
) => {
  if (jigsawSolved) return;

  event.currentTarget.setPointerCapture(
    event.pointerId
  );

  event.currentTarget.dataset.dragging = "true";

  event.currentTarget._dragStartX =
    event.clientX;

  event.currentTarget._dragStartY =
    event.clientY;

  event.currentTarget._dragMoved = false;
};

const handleJigsawPointerMove = (
  event
) => {
  const element = event.currentTarget;

  if (
    !element.hasPointerCapture(
      event.pointerId
    )
  ) {
    return;
  }

  const dx =
    event.clientX - element._dragStartX;

  const dy =
    event.clientY - element._dragStartY;

  const distance = Math.sqrt(
    dx * dx + dy * dy
  );

  if (distance > 8) {
    element._dragMoved = true;
  }
};

const handleJigsawPointerUp = (
  event,
  slotIndex
) => {
  const element = event.currentTarget;

  const wasDragged = element._dragMoved;

  element.releasePointerCapture(
    event.pointerId
  );

  element.dataset.dragging = "false";

  if (!wasDragged) {
    // It was a tap.
    handleJigsawTap(slotIndex);
    return;
  }

  /*
    Find which puzzle piece the pointer
    was released over.
  */
  const targetElement =
    document.elementFromPoint(
      event.clientX,
      event.clientY
    );

  const targetPiece =
    targetElement?.closest(
      "[data-jigsaw-slot]"
    );

  if (!targetPiece) {
    return;
  }

  const targetSlot = Number(
    targetPiece.dataset.jigsawSlot
  );

  if (Number.isNaN(targetSlot)) {
    return;
  }

  swapJigsawPieces(
    slotIndex,
    targetSlot
  );

  setSelectedJigsawPiece(null);
};

  /* =================================
     COUNTDOWN
  ================================= */

  useEffect(() => {
    if (countdown === null) return;

    /*
      When countdown reaches zero,
      DO NOT turn off the candle.

      Instead, show the blow button.
    */
    if (countdown === 0) {
      setShowBlowMessage(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown]);

  /* =================================
    BIRTHDAY AUDIO
  ================================= */

  useEffect(() => {
  if (memoryStep === 27 && letterAudioRef.current) {
    letterAudioRef.current.pause();
    letterAudioRef.current.currentTime = 0;
  }
}, [memoryStep]);

  useEffect(() => {
    if (!birthdayStarted || !audioRef.current) return;

    const audio = audioRef.current;

    const START_TIME = 24;
    const END_TIME = 49;

    audio.currentTime = START_TIME;
    audio.volume = 0.65;

    audio.play().catch(() => {
      console.log("Birthday audio waiting for user interaction.");
    });

    let animationFrame;

    const checkAudioEnd = () => {
      if (audio.currentTime >= END_TIME) {
        audio.pause();
        audio.currentTime = START_TIME;
        return;
      }

      animationFrame =
        requestAnimationFrame(checkAudioEnd);
    };

    checkAudioEnd();

    return () => {
      cancelAnimationFrame(animationFrame);

      audio.pause();
      audio.currentTime = 0;
    };
  }, [birthdayStarted]);
  /* =================================
     STOP MICROPHONE
  ================================= */

    const stopMicrophone = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(
          animationFrameRef.current
        );

        animationFrameRef.current = null;
      }

      if (microphoneRef.current) {
        microphoneRef.current
          .getTracks()
          .forEach((track) => {
            track.stop();
          });

        microphoneRef.current = null;
      }

      if (audioContextRef.current) {
        audioContextRef.current
          .close()
          .catch(() => {});

        audioContextRef.current = null;
      }

      analyserRef.current = null;

      setIsListening(false);
    };

    /* =================================
      CANDLE BLOWN OUT
    ================================= */

    const candleBlownOut = () => {
    if (candleBlown) return;

    stopMicrophone();

    setIsListening(false);

    // Turn candle off
    setCandleBlown(true);

    // Smoke shortly after
    setTimeout(() => {
      setShowSmoke(true);
    }, 250);

    // Show birthday photo after a delay
    setTimeout(() => {
      setShowBirthdayPhoto(true);
    }, 2200);
  };

  /* =================================
     DETECT BLOW
  ================================= */

  const detectBlow = () => {
    if (!analyserRef.current) return;

    const analyser = analyserRef.current;

    const dataArray = new Uint8Array(
      analyser.fftSize
    );

    const checkVolume = () => {
      if (!analyserRef.current) return;

      analyser.getByteTimeDomainData(
        dataArray
      );

      let sum = 0;

      for (
        let i = 0;
        i < dataArray.length;
        i++
      ) {
        const normalized =
          (dataArray[i] - 128) / 128;

        sum += normalized * normalized;
      }

      const volume = Math.sqrt(
        sum / dataArray.length
      );

      /*
        Blow threshold.

        Normal room:
        usually below this.

        Blow:
        should cross it.
      */
      if (volume > 0.12) {
        candleBlownOut();
        return;
      }

      animationFrameRef.current =
        requestAnimationFrame(checkVolume);
    };

    checkVolume();
  };

  /* =================================
     START MICROPHONE
  ================================= */

  const startMicrophone = async () => {
    if (candleBlown || isListening) return;

    setMicError(false);

    try {
      if (
        !navigator.mediaDevices ||
        !navigator.mediaDevices.getUserMedia
      ) {
        throw new Error(
          "Microphone is not supported."
        );
      }

      const stream =
        await navigator.mediaDevices.getUserMedia({
          audio: true,
        });

      microphoneRef.current = stream;

      const AudioContext =
        window.AudioContext ||
        window.webkitAudioContext;

      if (!AudioContext) {
        throw new Error(
          "AudioContext is not supported."
        );
      }

      const audioContext =
        new AudioContext();

      audioContextRef.current =
        audioContext;

      const analyser =
        audioContext.createAnalyser();

      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.3;

      const microphone =
        audioContext.createMediaStreamSource(
          stream
        );

      microphone.connect(analyser);

      analyserRef.current = analyser;

      setIsListening(true);

      detectBlow();

    } catch (error) {
      console.log(
        "Microphone error:",
        error
      );

      setMicError(true);
      setIsListening(false);
    }
  };

  /* =================================
     CLEANUP
  ================================= */

  useEffect(() => {
    return () => {
      stopMicrophone();
    };
  }, []);

  useEffect(() => {
  if (!showMemories) return;

  const resetScroll = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });

    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  };

  requestAnimationFrame(() => {
    requestAnimationFrame(resetScroll);
  });
}, [showMemories, memoryStep]);

  /* =================================
     RENDER
  ================================= */

  return (
    <main className="birthday-app">

      <audio
            ref={memoryAudioRef}
            src={memoryAudio}
            preload="auto"
          />

          <audio
            ref={letterAudioRef}
            src={letterAudio}
            preload="auto"
          />

      {/* =================================
          INTRO
      ================================= */}

      {!started && (
        <section className="intro-screen">

          <div className="intro-glow" />

          <div className="intro-content">

            <p className="intro-eyebrow">
              {eyebrowText}

              {eyebrowText && !titleLine1 && (
                <span className="typing-cursor">
                  |
                </span>
              )}
            </p>

            <h1>
              {titleLine1}

              {titleLine1 && !titleLine2 && (
                <span className="typing-cursor">
                  |
                </span>
              )}

              <br />

              {titleLine2}

              {titleLine2 && !subtitleText && (
                <span className="typing-cursor">
                  |
                </span>
              )}
            </h1>

            <p className="intro-subtitle">
              {subtitleText}

              {subtitleText && !nameText && (
                <span className="typing-cursor">
                  |
                </span>
              )}
            </p>

            <div className="intro-divider" />

            <p className="intro-name">
              {nameText}

              {nameText && !showButton && (
                <span className="typing-cursor">
                  |
                </span>
              )}
            </p>

            {showButton && (
              <button
                className="continue-button"
                onClick={() =>
                  setStarted(true)
                }
              >
                <span>OPEN</span>

                <span className="arrow">
                  →
                </span>
              </button>
            )}

          </div>

        </section>
      )}

      {/* =================================
          PIN
      ================================= */}

      {started && !unlocked && (
        <section className="pin-screen">

          <div className="pin-content">

            <p className="pin-eyebrow">
              A Little Secret
            </p>

            <h2>
              Before We Begin
            </h2>

            <div className="pin-lock">
              🔒
            </div>

            <p className="pin-label">
              Enter The PIN
            </p>

            <div className="pin-dots">
              {[0, 1, 2, 3].map(
                (index) => (
                  <span
                    key={index}
                    className={
                      index < pin.length
                        ? "pin-dot filled"
                        : "pin-dot"
                    }
                  />
                )
              )}
            </div>

            {wrongPin && (
              <p className="wrong-pin">
                Not Quite.. Try Again..
              </p>
            )}

            <div className="pin-keypad">

              {[
                1, 2, 3,
                4, 5, 6,
                7, 8, 9,
              ].map((number) => (
                <button
                  key={number}
                  onClick={() =>
                    handlePinInput(
                      String(number)
                    )
                  }
                >
                  {number}
                </button>
              ))}

              <button
                className="delete-key"
                onClick={handleDelete}
              >
                ←
              </button>

              <button
                onClick={() =>
                  handlePinInput("0")
                }
              >
                0
              </button>

              <button
                className="enter-key"
                onClick={handlePinEnter}
                disabled={pin.length !== 4}
              >
                ↵
              </button>

            </div>

          </div>

        </section>
      )}

      {/* =================================
          BIRTHDAY SCREEN
      ================================= */}

      {started && unlocked && !showMemories && (
        <section className="birthday-screen">

          <audio
            ref={audioRef}
            src={birthdayAudio}
            preload="auto"
          />

          

          {/* =================================
              BIRTHDAY INTRO
          ================================= */}

          {!birthdayStarted ? (

            <div className="birthday-intro">

              <div className="birthday-light" />

              <p className="birthday-small-text">
                {birthdaySmallText}
              </p>

              <h2>
                {birthdayTitle}
              </h2>

              <p className="birthday-name">
                {birthdayName}
              </p>

              {showBirthdayBegin && (
                <button
                  className="birthday-start-button"
                  onClick={startBirthday}
                >
                  <span>Begin</span>
                  <span>→</span>
                </button>
              )}

            </div>

          ) : (

            /* =================================
               CAKE SCENE
            ================================= */

            <div className="cake-scene">

              <div className="birthday-heading">

                <p>
                  HAPPY 21ST BIRTHDAY
                </p>

                <h2>
                  Haseennaaa
                </h2>

              </div>

              {/* =================================
                  CAKE
              ================================= */}

              <div className="cake-wrapper">

                {/* Candle */}

                <div className="candle">

                  <div
                    className={`flame ${
                      candleBlown
                        ? "flame-hidden"
                        : ""
                    }`}
                  />

                  {/* Smoke */}

                  {showSmoke && (
                    <div className="smoke">

                      <span />
                      <span />
                      <span />

                    </div>
                  )}

                </div>

                {/* Cake */}

                <div className="cake">

                  {/* Top tier */}

                  <div className="cake-top-tier">

                    <div className="top-frosting">

                      <span />
                      <span />
                      <span />

                    </div>

                    <div className="cake-decoration">

                      <i />
                      <i />
                      <i />
                      <i />
                      <i />

                    </div>

                  </div>

                  {/* Middle frosting */}

                  <div className="cake-frosting">

                    <span />
                    <span />
                    <span />
                    <span />
                    <span />

                  </div>

                  {/* Bottom tier */}

                  <div className="cake-bottom-tier">

                    <div className="cake-detail">

                      <span />
                      <span />
                      <span />

                    </div>

                  </div>

                </div>

                {/* Plate */}

                <div className="cake-plate" />

              </div>

              {/* =================================
                  COUNTDOWN
              ================================= */}

              {countdown > 0 && (
                <div className="countdown-number">
                  {countdown}
                </div>
              )}

              {/* =================================
                  BLOW MESSAGE
              ================================= */}

              {showBlowMessage &&
                !candleBlown && (

                  <div className="blow-message">

                    <p>
                      Make A Wish
                    </p>

                    {!isListening ? (

                      <button
                        onClick={
                          startMicrophone
                        }
                      >
                        BLOW THE CANDLE
                      </button>

                    ) : (

                      <div className="listening-message">

                        <span className="mic-pulse" />

                        Blow gently...

                      </div>

                    )}

                    {micError && (

                      <button
                        className="fallback-blow"
                        onClick={
                          candleBlownOut
                        }
                      >
                        TAP TO BLOW
                      </button>

                    )}

                  </div>
                )}

              {/* =================================
                  AFTER BLOW
              ================================= */}

              {candleBlown && !showBirthdayPhoto && (

                <div className="after-blow-message">

                  <p>
                    You Made It !!
                  </p>

                </div>

              )}
              
              {/* =================================
                  BIRTHDAY PHOTO REVEAL
              ================================= */}

              {showBirthdayPhoto && (

                <div className="birthday-photo-reveal">

                  <div className="photo-glow" />

                  <div className="birthday-photo-frame">

                    <img
                      src={birthdayGirlCake}
                      alt="Birthday girl holding her cake"
                    />

                  </div>

                  <div className="photo-reveal-text">

                    <p>
                      Happy 21 !!
                    </p>

                    <h3>
                      ❤️
                    </h3>

                  </div>

                  <button
                    className="photo-continue-button"
                    onClick={() => {
                      setShowBirthdayPhoto(false);
                      setShowGift(true);
                    }}
                  >
                    Continue →
                  </button>

                </div>

              )}

              {/* =================================
                  GIFT SCENE
              ================================= */}

              {showGift && (

                <div className="gift-scene">
                  {!giftOpened && (
                  <div className="gift-intro">

                    <p className="gift-small-text">
                      But..
                    </p>

                    <h2>
                      I Didn't Make All This
                      <br />
                      Just For A Cake
                    </h2>

                    <p className="gift-subtext">
                      There's something waiting for you
                    </p>

                  </div>
                  )}


                  <div
                    className={`gift-box-container ${
                      giftOpened ? "gift-is-open" : ""
                    }`}
                    onClick={() => setGiftOpened(true)}
                  >

                    {/* GLOW */}

                    <div className="gift-light" />


                    {/* LID */}

                    <div className="gift-lid">

                      <div className="gift-ribbon-horizontal" />

                      <div className="gift-ribbon-vertical" />

                    </div>


                    {/* BOX */}

                    <div className="gift-box">

                      <div className="gift-ribbon-vertical" />

                      <div className="gift-ribbon-horizontal" />

                    </div>


                    {/* INSIDE LIGHT */}

                    {giftOpened && (

                      <div className="gift-open-light">

                        <span>✨</span>
                        <span>✦</span>
                        <span>✨</span>

                      </div>

                    )}

                  </div>


                  {!giftOpened && (

                    <div className="gift-open-prompt">

                      <span>Tap to open</span>

                      <small>
                        Your Little Surprise !!
                      </small>

                    </div>

                  )}


                  {giftOpened && (

                    <div className="gift-reveal-message">

                      <p>
                        This One Is A Little Different
                      </p>

                      <h3>
                        It's Specially Made For You
                      </h3>

                      <button
                        className="gift-continue-button"
                        onClick={() => {
                          if (audioRef.current) {
                            fadeOutAudio(audioRef.current, 1400);
                          }

                          setTimeout(() => {
                            startMemoryMusic();
                            setShowGift(false);
                            setShowMemories(true);
                            setMemoryStep(0);
                          }, 900);
                        }}
                      >
                        Begin The Story →
                      </button>

                    </div>

                  )}

                </div>

              )}

              

            </div>

          )}

        </section>
      )}

      {showMemories && (
  <div className="memory-scene">

    {/* INTRO */}
    {memoryStep === 0 && (
      <div className="memory-intro">

        <div className="memory-intro-content">
          <span className="memory-chapter">THE BEGINNING</span>

          <h1>
            Before 21
          </h1>

          <p>
            There Was A Smaller Version Of You
          </p>

          <div className="time-portal">

            <div className="portal-stars">
              <span>✦</span>
              <span>·</span>
              <span>✦</span>
              <span>·</span>
              <span>✧</span>
              <span>·</span>
              <span>✦</span>
            </div>

            <div className="portal-door">
              <div className="portal-glow" />
              <div className="portal-door-inner">
                <span>01</span>
              </div>
            </div>

          </div>

          <p className="memory-hint">
            Some Stories Are Worth Going Back In Time For
          </p>

          <button
            className="memory-next-button"
            onClick={() => setMemoryStep(1)}
          >
            Go Back In Time →
          </button>

        </div>

      </div>
    )}

    {/* ONE YEAR OLD */}
    {memoryStep === 1 && (
      <div className="childhood-memory">

        <div className="memory-photo-section">

          <span className="memory-chapter">
            CHAPTER I
          </span>

          <div className="memory-photo-frame">
            <img
              src={babyOnePhoto}
              alt="Jerry as a little child"
            />
          </div>

          <div className="memory-photo-caption">
            <span>01</span>

            <div>
              <h2>
                Before She Knew
              </h2>

              <p>
                How Big The Life Was That She Need To Live
              </p>
            </div>
          </div>

        </div>

        <button
          className="memory-next-button"
          onClick={() => setMemoryStep(2)}
        >
          And Then She Grew →
        </button>

      </div>
    )}

    {/* FOUR YEARS OLD */}
    {memoryStep === 2 && (
      <div className="childhood-memory chapter-two-memory">

        <div className="memory-photo-section">

          <span className="memory-chapter">
            CHAPTER II
          </span>

          <div className="memory-photo-frame">
            <img
              src={babyFourPhoto}
              alt="Jerry as a child"
            />
          </div>

          <div className="memory-photo-caption">
            <span>02</span>

            <div>
              <h2>
                And Somehow
              </h2>

              <p>
                That Little Girl Started Her Schooling Journey
              </p>
            </div>
          </div>

        </div>

        <button
          className="memory-next-button"
          onClick={() => setMemoryStep(3)}
        >
          Keep Going →
        </button>

      </div>
    )}

    {/* SCHOOL INTRO */}
{memoryStep === 3 && (
  <div className="school-memory-intro">

    <div className="school-intro-content">

      <span className="memory-chapter">
        CHAPTER III
      </span>

      <h1>
        And Then
      </h1>

      <p>
        She Started Finding Her People
      </p>

      <div className="school-divider">
        <span />
        <span>✦</span>
        <span />
      </div>

      <p className="school-small-line">
        Somewhere Along The Way,
        <br />
        Childhood Became Friendship
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(4)}
      >
        See Where It Began →
      </button>

    </div>

  </div>
)}

{/* SCHOOL GANG ONE */}
{memoryStep === 4 && (
  <div className="school-photo-memory">

    <div className="school-photo-content">

      <span className="memory-chapter">
        SCHOOL DAYS
      </span>

      <div className="school-photo-frame">
        <img
          src={schoolGangOnePhoto}
          alt="Jerry with her school friends"
        />
      </div>

      <div className="school-photo-text">

        <span className="school-photo-number">
          01
        </span>

        <div>
          <h2>
            Different Memories
          </h2>

          <p>
            Many Moments, Many Faces, Many Laughs
          </p>
        </div>

      </div>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(5)}
      >
        Keep Going →
      </button>

    </div>

  </div>
)}

{/* SCHOOL GANG TWO */}
{memoryStep === 5 && (
  <div className="school-photo-memory school-photo-memory-alt">

    <div className="school-photo-content">

      <span className="memory-chapter">
        SCHOOL DAYS
      </span>

      <div className="school-photo-frame school-photo-frame-alt">
        <img
          src={schoolGangTwoPhoto}
          alt="Jerry with her school friends"
        />
      </div>

      <div className="school-photo-text">

        <span className="school-photo-number">
          02
        </span>

        <div>
          <h2>
            Different Stories
          </h2>

          <p>
            But All Of Them, Became A Part Of Her
          </p>
        </div>

      </div>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(6)}
      >
        And Then →
      </button>

    </div>

  </div>
)}

{/* TRIO INTRO */}
{memoryStep === 6 && (
  <div className="school-trio-intro">

    <div className="school-intro-content">

      <span className="memory-chapter">
        THE CLOSER ONES
      </span>

      <h1>
        And Among
        <br />
        All Those Faces
      </h1>

      <p>
        There Were A Few,
        <br />
        That Stayed A Little Closer
      </p>

      <div className="school-divider">
        <span />
        <span>♡</span>
        <span />
      </div>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(7)}
      >
        See Them →
      </button>

    </div>

  </div>
)}

{/* TRIO ONE */}
{memoryStep === 7 && (
  <div className="school-photo-memory trio-memory">

    <div className="school-photo-content">

      <span className="memory-chapter">
        THE THREE
      </span>

      <div className="school-photo-frame trio-frame">
        <img
          src={schoolTrioOnePhoto}
          alt="Jerry with her close school friends"
        />
      </div>

      <div className="school-photo-text">

        <span className="school-photo-number">
          01
        </span>

        <div>
          <h2>
            Some Friendships
          </h2>

          <p>
            Just Happen, But This Bond Still Remains
          </p>
        </div>

      </div>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(8)}
      >
        One More →
      </button>

    </div>

  </div>
)}

{/* TRIO TWO */}
{memoryStep === 8 && (
  <div className="school-photo-memory trio-memory">

    <div className="school-photo-content">

      <span className="memory-chapter">
        THE THREE
      </span>

      <div className="school-photo-frame trio-frame trio-frame-final">
        <img
          src={schoolTrioTwoPhoto}
          alt="Jerry with her close school friends"
        />
      </div>

      <div className="school-final-text">

        <p>
          Some Friendships Don't Need
          <br />
          A Long Explanation
        </p>

        <h2>
          They Just Happen, And Stay
        </h2>

      </div>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(9)}
      >
        Keep Going →
      </button>

    </div>

  </div>
)}

{/* =================================
    JIGSAW
================================= */}

{memoryStep === 9 && (
  <div className="jigsaw-memory">

    {!jigsawSolved ? (
      <>

        <div className="jigsaw-intro">

          <span className="memory-chapter">
            ONE MORE THING
          </span>

          <h1>
            Some Memories
            <br />
            Won't Come's Back
            <br />
            All At Once
          </h1>

          <p>
            Piece By Piece
          </p>

        </div>

        <div className="jigsaw-board">

          {jigsawOrder.map((piece, slotIndex) => (

            <div
  key={slotIndex}
  className={`jigsaw-piece ${
    selectedJigsawPiece === slotIndex
      ? "jigsaw-piece-selected"
      : ""
  }`}
  data-jigsaw-slot={slotIndex}

  onPointerDown={(event) =>
    handleJigsawPointerDown(
      event,
      slotIndex
    )
  }

  onPointerMove={handleJigsawPointerMove}

  onPointerUp={(event) =>
    handleJigsawPointerUp(
      event,
      slotIndex
    )
  }

  style={{
    backgroundImage: `url(${jigsawPhoto})`,
    backgroundSize: "300% 300%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: `
      ${(piece % 3) * 50}%
      ${Math.floor(piece / 3) * 50}%
    `,
  }}
/>

          ))}

        </div>

        <p className="jigsaw-instruction">
          Tap Two Pieces To Swap Them
          <br />
          Or Drag One Onto Another
        </p>

      </>
    ) : (

       <div className="jigsaw-solved">

    <span className="memory-chapter">
      YOU FOUND HER
    </span>

    <div className="jigsaw-solved-image-wrap">
      <img
        src={jigsawPhoto}
        alt="A special memory"
        className="jigsaw-solved-image"
      />
    </div>

    <div className="jigsaw-solved-heart">
      🧿
    </div>

    <h1>
      There She Is
    </h1>

    <p>
      Some Memories Are Worth
      <br />
      Putting Back Together
    </p>

    <button
      className="memory-next-button"
      onClick={() => setMemoryStep(10)}
    >
      Continue →
    </button>

  </div>

    )}

  </div>
)}


{memoryStep === 10 && (
  <div className="memory-page sleeping-memory">

    <div className="sleeping-memory-content">

      <span className="memory-chapter">
        SOMEWHERE ALONG THE WAY
      </span>

      <h1>
        Between Growing Up
        <br />
        And Becoming Who She Is
      </h1>

      <div className="sleeping-photo-wrap">
        <img
          src={sleepingPhoto}
          alt="A quiet childhood memory"
          className="sleeping-photo"
        />
      </div>

      <p className="sleeping-caption">
        Still Just A Sleepy Girl
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(11)}
      >
        Keep Going →
      </button>

    </div>

  </div>
)}

{memoryStep === 11 && (
  <div className="personality-memory">

    <div className="personality-intro">

      <span className="memory-chapter">
        AND THEN
      </span>

      <h1>
        She Grew Up
      </h1>

      <p>
        And Somewhere Along The Way,
        <br />
        She Started Becoming Herself
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(12)}
      >
        Keep Going →
      </button>

    </div>

  </div>
)}

{memoryStep === 12 && (
  <div className="personality-memory">

    <div className="personality-photo-page">

      <span className="memory-chapter">
        CHAPTER IV
      </span>

      <div className="personality-photo-wrap">
        <img
          src={modernDressPhoto1}
          alt="A memory"
          className="personality-photo"
        />
      </div>

      <p className="personality-caption">
        Somewhere Between Then And Now
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(13)}
      >
        And Then →
      </button>

    </div>

  </div>
)}

{memoryStep === 13 && (
  <div className="personality-memory">

    <div className="personality-photo-page">

      <div className="personality-photo-wrap">
        <img
          src={modernDressPhoto2}
          alt="A memory"
          className="personality-photo"
        />
      </div>

      <p className="personality-caption">
        She Changed
        <br />
        In All The Little Ways That Mattered
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(14)}
      >
        One More →
      </button>

    </div>

  </div>
)}

{memoryStep === 14 && (
  <div className="personality-memory">

    <div className="personality-photo-page">

      <div className="personality-photo-wrap">
        <img
          src={blackDressPhoto}
          alt="A memory"
          className="personality-photo"
        />
      </div>

      <p className="personality-caption">
        But Somehow,
        <br />
        She Was Always Becoming More Herself
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(15)}
      >
        Continue →
      </button>

    </div>

  </div>
)}

{memoryStep === 15 && (
  <div className="family-memory">

    <div className="family-intro">

      <span className="memory-chapter">
        THE PEOPLE WHO WERE THERE
      </span>

      <h1>
        And Then,
        <br />
        There Was Them
      </h1>

      <p>
        The Ones Who Watched Her Growth,
        <br />
        Long Before She Knew Who She'd Become
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(16)}
      >
        Keep Going →
      </button>

    </div>

  </div>
)}

{memoryStep === 16 && (
  <div className="family-memory">

    <div className="family-photo-page family-final">

      <span className="memory-chapter">
        HOME
      </span>

      <div className="family-photo-wrap family-full-photo">
        <img
          src={familyPhoto}
          alt="The whole family"
          className="family-photo"
        />
      </div>

      <p className="family-caption family-final-caption">
        Before All The Places She Would Go,
        <br />
        There Was Always A Place Come Back To
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(17)}
      >
        Continue →
      </button>

    </div>

  </div>
)}

{memoryStep === 17 && (
  <div className="family-memory">

    <div className="family-photo-page">

      <span className="memory-chapter">
        HER PEOPLE
      </span>

      <div className="family-photo-wrap">
        <img
          src={brotherPhoto}
          alt="A family memory"
          className="family-photo"
        />
      </div>

      <p className="family-caption">
        Different Worlds,        
        <br />
        Different Personalities,
        <br />
        But Still They're Family Members
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(18)}
      >
        And Then... →
      </button>

    </div>

  </div>
)}

{memoryStep === 18 && (
  <div className="family-memory">

    <div className="family-photo-page">

      <span className="memory-chapter">
        HER PEOPLE
      </span>

      <div className="family-photo-wrap">
        <img
          src={sisterPhoto}
          alt="A family memory"
          className="family-photo"
        />
      </div>

      <p className="family-caption">
        Some People Grow Up Beside You,
        <br />
        And Somehow Become Part Of Who You Are
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(19)}
      >
        One More →
      </button>

    </div>

  </div>
)}

{memoryStep === 19 && (
  <div className="college-memory">
    <div className="college-intro">

      <span className="memory-chapter">
        THEN CAME NEW CHAPTER
      </span>

      <h1>
        And Then Life
        <br />
        Got A Little Bigger
      </h1>

      <p>
        New Places, New People
        <br />
        And A Newer Version Of Her
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(20)}
      >
        Step Into It →
      </button>

    </div>
  </div>
)}

{memoryStep === 20 && (
  <div className="college-memory">
    <div className="college-photo-page">

      <span className="memory-chapter">
        COLLEGE DAYS
      </span>

      <div className="college-photo-wrap">
        <img
          src={collegeSareePhoto}
          alt="A college memory"
          className="college-photo"
        />
      </div>

      <p className="college-caption">
        Somewhere Along The Way,
        <br />
        The Little Girl Had Grown Up
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(21)}
      >
        And Then Came The Gang →
      </button>

    </div>
  </div>
)}

{memoryStep === 21 && (
  <div className="college-memory">
    <div className="college-photo-page">

      <span className="memory-chapter">
        THE COLLEGE YEARS
      </span>

      <h1>
        2023 - 2027
        <br />
        She Found Her People
      </h1>

      <div className="college-collage-image-wrap">
        <img
          src={collegeCollage1}
          alt="College memories"
          className="college-collage-image"
        />
      </div>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(22)}
      >
        There's More →
      </button>

    </div>
  </div>
)}

{memoryStep === 22 && (
  <div className="college-memory">
    <div className="college-photo-page">

      <div className="college-collage-image-wrap">
        <img
          src={collegeCollage2}
          alt="College memories"
          className="college-collage-image"
        />
      </div>

      <p className="college-caption">
        Different Days, Different Memories
        <br />
        But The People Stayed The Same
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(23)}
      >
        Keep Going →
      </button>

    </div>
  </div>
)}

{memoryStep === 23 && (
  <div className="college-memory">
    <div className="college-photo-page">

      <span className="memory-chapter">
        THE PEOPLE
      </span>

      <div className="college-photo-wrap">
        <img
          src={friendsPhoto}
          alt="Friends"
          className="college-photo"
        />
      </div>

      <p className="college-caption">
        Because In The End,
        <br />
        It's The Memories With Them 
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(24)}
      >
        One Last Memory →
      </button>

    </div>
  </div>
)}

{memoryStep === 24 && (
  <div className="birthday-memory">
    <div className="birthday-memory-content">

      <span className="memory-chapter">
        ONE YEAR AGO
      </span>

      <div className="birthday-photo-wrap">
        <img
          src={lastYearBirthdayPhoto}
          alt="Last year's birthday"
          className="birthday-memory-photo"
        />
      </div>

      <p className="birthday-memory-caption">
        And Somehow,
        <br />
        Here We Are Again
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(25)}
      >
        There's Something I Want To Tell You →
      </button>

    </div>
  </div>
)}

{memoryStep === 25 && (
  <div className="emotional-transition">
    <div className="emotional-transition-content">

      <span className="memory-chapter">
        AND AFTER ALL THESE YEARS
      </span>

      <h1>
        From That Little Girl To
        <br />
        The Person Standing Here
      </h1>

      <p>
        There Are So Many Things
        <br />
        You Crossed A Longer Way
      </p>

      <button
        className="memory-next-button"
        onClick={() => setMemoryStep(26)}
      >
        Read This →
      </button>

    </div>
  </div>
)}

{memoryStep === 26 && (
  <div className="letter-memory">

    {!letterOpened ? (

      <div className="letter-intro">

        <span className="memory-chapter">
          SOME THINGS
        </span>

        <h1>
          Are Better
          <br />
          Written Down
        </h1>

        <div className="letter-envelope-wrap">

          <div className="letter-envelope">

            <div className="letter-envelope-flap">
            </div>

            <div className="letter-envelope-body">

              <div className="letter-seal">
                ♥
              </div>

            </div>

          </div>

        </div>

        <p className="letter-intro-text">
          There's Something
          <br />
          I've Been Wanting To Say
        </p>

        <button
          className="memory-next-button"
          onClick={() => {
            setLetterOpened(true);

            if (memoryAudioRef.current) {
              memoryAudioRef.current.pause();
              memoryAudioRef.current.currentTime = 0;
            }

            if (letterAudioRef.current) {
              letterAudioRef.current.currentTime = 0;
              letterAudioRef.current.volume = 0.35;
              letterAudioRef.current.play().catch(() => {});
            }
          }}
        >
          Open It →
        </button>

      </div>

    ) : (

      <div className="letter-page">

        <span className="memory-chapter">
          FOR YOU
        </span>

        <div className="letter-paper">

          <div className="letter-paper-inner">

            <h2>
              Heyy Haseennaaa,
            </h2>

            <div className="letter-content">

              <p>
                I still don't know how to start this.. It's a long 
                journey since sept 2025.. Before that I know you as 
                just a person in my class.. After that only I came to
                know really who you are.. We started to talk, daily 
                chats and the rest is history.. We created more 
                memorable and funnier moments together they still 
                remains as a beautiful memories forever !! You crossed 
                a longer way since 2005, 21 long years you faced a lot 
                of struggles and many funnier and happy moments since 
                your school days.. This website is entirely made for 
                you, it's just a recap of the 21 years of travel.. 
                Atlast Stay Strong and Don't change yourself for
                anyone.. Inshallah good days are upcoming for you 
                always stay calm with the vibes of paathukalam.. 
                Finally, Happy 21 Jerry !! Epovum Sirichitae Iru 
                Haseennaa :)
              </p>

            </div>

          </div>

        </div>

        <button
          className="memory-next-button"
          onClick={() => setMemoryStep(27)}
        >
          One Last Thing →
        </button>

      </div>

    )}

  </div>
)}

{memoryStep === 27 && (
  <div className="final-memory">

    <div className="final-memory-content">

      <span className="memory-chapter">
        AND FINALLY
      </span>

      <h1>
        Happy 21st Birthday
      </h1>

      <div className="final-photo-wrap">
        <img
          src={finalBirthdayPhoto}
          alt="A special birthday memory"
          className="final-photo"
        />
      </div>

      <p className="final-message">
        After Everything You've Seen Here,
        <br />
        There's Only One Thing Left To Say
      </p>

      <p className="final-line">
        Epovum Sirichitae Iru 
      </p>

      <div className="final-signature">
        Haseenaaa 🫶🏻❤️
      </div>

      <div className="final-divider">
        <span></span>
        ❤️
        <span></span>
      </div>

      <p className="final-end">
        THE END
      </p>

    </div>

  </div>
)}

</div>
)}



    </main>
  );
}

export default App;