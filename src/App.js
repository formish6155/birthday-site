import React, { useState } from "react";

const App = () => {
  const [stage, setStage] = useState(0);
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [foundItems, setFoundItems] = useState([]);
  const [showVideo, setShowVideo] = useState(false);

  const handleStart = () => setStage(1);
  
  const handleRiddleSubmit = () => {
    if (riddleAnswer.trim().toLowerCase() === "огонь") {
      setStage(2);
    } else {
      // Тряска поля ввода
      const input = document.getElementById("riddle-input");
      input.style.transform = "translateX(10px)";
      setTimeout(() => input.style.transform = "translateX(-10px)", 100);
      setTimeout(() => input.style.transform = "translateX(10px)", 200);
      setTimeout(() => input.style.transform = "translateX(0)", 300);
    }
  };

  const handleItemClick = (item) => {
    if (!foundItems.includes(item)) {
      setFoundItems([...foundItems, item]);
    }
  };

  const allItemsFound = foundItems.length === 3;
  const handlePlayVideo = () => setShowVideo(true);

  // Стили прямо в компоненте
  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #8A2BE2, #FF1493, #FF6347)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      color: 'white',
      textAlign: 'center',
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif'
    },
    card: {
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(10px)',
      borderRadius: '20px',
      padding: '30px',
      maxWidth: '600px',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
    },
    button: {
      background: 'linear-gradient(45deg, #FFD700, #FF8C00)',
      color: 'white',
      border: 'none',
      padding: '15px 30px',
      fontSize: '18px',
      borderRadius: '50px',
      cursor: 'pointer',
      fontWeight: 'bold',
      marginTop: '20px',
      boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.2s, box-shadow 0.2s'
    },
    input: {
      padding: '12px',
      fontSize: '16px',
      margin: '20px 0',
      borderRadius: '10px',
      border: '2px solid white',
      background: 'rgba(255, 255, 255, 0.2)',
      color: 'white',
      width: '250px',
      textAlign: 'center'
    },
    item: {
      position: 'absolute',
      cursor: 'pointer',
      padding: '15px',
      borderRadius: '15px',
      background: 'rgba(255, 255, 255, 0.2)',
      border: '2px solid white',
      fontSize: '24px',
      transition: 'transform 0.2s'
    }
  };

  return (
    <div style={styles.container}>
      {/* Stage 0: Start */}
      {stage === 0 && (
        <div style={styles.card}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎉</div>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>С Днём Рождения, Друг! 🎂</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
            Пройди 3 испытания, чтобы раскрыть сюрприз!
          </p>
          <button 
            style={styles.button}
            onClick={handleStart}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Начать приключение →
          </button>
        </div>
      )}

      {/* Stage 1: Riddle */}
      {stage === 1 && (
        <div style={styles.card}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>❓</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Испытание 1: Загадка</h2>
          <p style={{ fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '20px' }}>
            "Я не живу, но расту. У меня нет лёгких, но мне нужен воздух. Что я?"
          </p>
          <p style={{ color: '#FFD700', marginBottom: '20px' }}>💡 Подсказка: это нужно для свечей на торте</p>
          <input
            id="riddle-input"
            type="text"
            value={riddleAnswer}
            onChange={(e) => setRiddleAnswer(e.target.value)}
            placeholder="Твой ответ..."
            style={styles.input}
            onKeyPress={(e) => e.key === 'Enter' && handleRiddleSubmit()}
          />
          <button 
            style={styles.button}
            onClick={handleRiddleSubmit}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Проверить ответ
          </button>
        </div>
      )}

      {/* Stage 2: Find Items */}
      {stage === 2 && (
        <div style={{ ...styles.card, position: 'relative', minHeight: '500px' }}>
          <div style={{ fontSize: '40px', marginBottom: '20px' }}>🔍</div>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Испытание 2: Поиск предметов</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
            Найди 3 предмета: <span style={{ color: '#FFD700', fontWeight: 'bold' }}>{foundItems.length}/3</span>
          </p>
          
          {!foundItems.includes('cake') && (
            <div 
              style={{ ...styles.item, top: '30%', right: '20%' }}
              onClick={() => handleItemClick('cake')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🎂
            </div>
          )}
          
          {!foundItems.includes('balloon') && (
            <div 
              style={{ ...styles.item, top: '25%', left: '20%' }}
              onClick={() => handleItemClick('balloon')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🎈
            </div>
          )}
          
          {!foundItems.includes('present') && (
            <div 
              style={{ ...styles.item, bottom: '25%', right: '25%' }}
              onClick={() => handleItemClick('present')}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🎁
            </div>
          )}
          
          {allItemsFound && (
            <button 
              style={{ ...styles.button, position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}
              onClick={() => setStage(3)}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.05) translateX(-50%)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1) translateX(-50%)'}
            >
              Перейти к подарку →
            </button>
          )}
        </div>
      )}

      {/* Stage 3: Video */}
      {stage === 3 && (
        <div style={styles.card}>
          <div style={{ fontSize: '60px', marginBottom: '20px' }}>🎂</div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>Поздравление!</h2>
          <p style={{ fontSize: '1.3rem', marginBottom: '30px' }}>
            Нажми на торт, чтобы открыть подарок
          </p>
          
          {!showVideo ? (
            <button 
              style={{ ...styles.button, padding: '20px 40px', fontSize: '24px' }}
              onClick={handlePlayVideo}
              onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
            >
              🎂 Открыть подарок
            </button>
          ) : (
            <div style={{ width: '100%', height: '300px', background: '#000', borderRadius: '10px', overflow: 'hidden' }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
                title="Поздравление"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
          
          {showVideo && (
            <p style={{ fontSize: '1.5rem', marginTop: '20px', color: '#FFD700' }}>
              Спасибо, что прошёл путь до конца! 🥳
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
