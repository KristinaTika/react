import React from 'react';
import "./Answer.css";

const Answer = (props) => {

    const { correct, wrong, answer, id, handleClickedAnswer, finish } = props;
    let rightAnswer = correct || answer;

    const displayAnswers = () => {
        if (correct) {
            return correct;
        }
        return wrong;
    }

    const colorAnswers = () => {
        let color;
        const { answers } = props;

        answers.map((givenAnswer) => {
            if (givenAnswer.id === id) {
                if (givenAnswer.answer === false) {
                    if (givenAnswer.clickedResponse === wrong) {
                        return color = "wrong";
                    }
                    return;
                }
                if (givenAnswer.answer === true) {
                    if (givenAnswer.clickedResponse === correct) {
                        return color = "right";
                    }
                }
            }
        });

        return color;
    }

    return (
        <div className={finish === true ? "" : "div-hover"}>
        <div className={finish === true ? colorAnswers() : ""} >
            <input type="radio" name={props.id} value={displayAnswers()} onClick={(e) => handleClickedAnswer(e, rightAnswer, id)} className="bla" />
            <span>{displayAnswers()}</span>
        </div>
        </div>
    );
};

export default Answer;