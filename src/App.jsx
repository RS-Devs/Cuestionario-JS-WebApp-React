import questions from "./questions.js";
import { useState, useEffect } from "react";

function App() {
  const [started, setStarted] = useState(false);
  
  const [actualQuestion, setActualQuestion] = useState(0)
  const [points, setPoints] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [timeLeft, setTimeLeft] = useState(15)
  const [ifTimeLeft, setIfTimeleft] = useState(false)
  const [answerShown, setAnswerShown] = useState(false)


  const handleAnswerSubmit = (isCorrect, e)=>{
    // añadir la puntuación
    if (isCorrect) setPoints(points + 1)
    // añadir estilos pregunta
    e.target.classList.add(isCorrect ? "correct" : "incorrect")
    // cambiar a la siguiente pregunta

    setTimeLeft(15)
    setTimeout(() => {
      if(actualQuestion === questions.length -1){
        setIsFinished(true)
      }else{
        setActualQuestion(actualQuestion + 1)
      }
    },1000)
    
  }
  
  useEffect(() => {
    if (!started) {
      return;
    }

    const interval = setInterval(()=>{
      if(timeLeft > 0) setTimeLeft((prev) => prev - 1)
      if (timeLeft === 0) setIfTimeleft(true)
    }, 1000);

    return ()=> clearInterval(interval)
  }, [timeLeft, started])

  if(isFinished) return (
    <main className="app">
      <div className="quiz-finished">
        <span> 
          Has obtenido un puntuacion de {points} sobre {questions.length} 
        </span>
        <button onClick={()=> window.location.href="/"} >Reiniciar la prueba</button>
        <button onClick={()=> {
          setIsFinished(false)
          setAnswerShown(true)
          setActualQuestion(0)
        }} >Ver Respuestas</button>
      </div>
    </main>
  )


  if(answerShown) return (<main className="app">
     <div className="left">
        <div className="number-question">
          <span>Pregunta {actualQuestion + 1} de </span> {questions.length}
        </div>
        <div className="tite-question">{questions[actualQuestion].title}</div>
        <div>
          {questions[actualQuestion].options.filter((option)=> option.isCorrect)[0].answerText}
        </div>

        <button onClick={()=>{
          if(actualQuestion === questions.length -1){
            window.location.href="/"
          }else{
            setActualQuestion(actualQuestion + 1)
          }
        }}>
          
          {actualQuestion === questions.length - 1 ? "Volver a intentarlo" : "Siguiente"}
        </button>
      </div>
     
    
  </main>)




  return (

    <main className="app">
      {!started && (
        <button className="start-btn" onClick={() => {setStarted(!started); setTimeLeft(15);}}><p className="text-start-btn"> Comenzar el cuestionario</p></button>
      )}
      {started && (


    <main className="app">
      
      {/* LADO IZQUIERDO */}
      <div className="left">
        <div className="number-question">
          <span>Pregunta {actualQuestion + 1} de </span> {questions.length}
        </div>
        <div className="tite-question">{questions[actualQuestion].title}</div>
      </div>
      <div>{!ifTimeLeft ? (
        <span className="time-left">
          Tiempo restante: {timeLeft}{""}
        </span>
        ) : (
          <button
            onClick={()=>{
              setTimeLeft(15)
              setIfTimeleft(false)
              setActualQuestion(actualQuestion + 1)
            }}
            >
            Continuar
          </button>
        )}
        
      </div>

      {/* LADO DERECHO */}
      <div className="right">
        {questions[actualQuestion].options.map((answer) =>(
        <button disabled={ifTimeLeft}  key={answer.answerText} onClick={(e) => handleAnswerSubmit(answer.isCorrect, e)} >
          {answer.answerText}  
        </button>) 
        )}
      </div>
    </main>
    )}
    </main>
  );
}

export default App;
