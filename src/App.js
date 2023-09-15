import React, { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';

import GuessArea from "./page/GuessArea";
import Keyboard from "./page/Keyboard";
import MessageCenter from "./page/MessageCenter";
import TopBanner from "./page/TopBanner";
import BasicModal from "./components/BasicModal"

import { numGuessAreaRows, numGuessAreaColumns } from "./utils/sizes";
import boxStyleVariants from "./utils/keyboardAndGuessAreaBoxTypes";

const ListOfWords = require("./utils/fiveLetterWords.json");

// Logic for grid
const randomIndex = Math.floor(Math.random() * ListOfWords.words.length);
const answer = ListOfWords.words[randomIndex];
//const answer = 'mmmmm';
let textForInfo = 'Type a 5 character word!';

let letterUsedNoMatch = [];
console.log ('Answer = ' + answer);

let stopGame = false;
let win = false;


// =====================================================================================================================
// Main App 
function App() {
  const KeysRow1 = ["Q","W","E","R","T","Y","U","I","O","P","A","S","D","F","G","H","J","K","L","Z","X","C","V","B","N","M",];

  const initialKeyBoard = () => {
    let keys = KeysRow1.map((letter) => ({
      ...boxStyleVariants.keyboardUnusedKey,
      letter: letter,
    }));
    const backspaceKey = {
      ...boxStyleVariants.keyboardUnusedKey, // you should probably create a new variant for backspace and enter keys
      width: 90,
      letter: "Delete",
      isBackspaceKey: true,
    };
    const enterKey = {
      ...boxStyleVariants.keyboardUnusedKey,
      width: 90,
      letter: "Enter",
      isEnterKey: true,
    };
    //keys.unshift(backspaceKey);

    keys = [...keys.slice(0, 19), backspaceKey, ...keys.slice(19)];
    keys.push(enterKey);
    return keys;
  };
  
  // ++++++++++++ ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  const [activeRow, setActiveRow] = useState(new Array(numGuessAreaColumns).fill(boxStyleVariants.blankBox));
  const [activeRowIdx, setActiveRowIdx] = useState(0); // the index of the first letter that gets added to the active row.
  const [keyboard, setKeyboard] = useState(initialKeyBoard);
  
  const [completedRows, setCompletedRows] = useState([])
  const [remainingRows, setRemainingRows] = useState(new Array((numGuessAreaRows - 1) * numGuessAreaColumns).fill(boxStyleVariants.blankBox));
  
  const allBoxes = [...completedRows, ...activeRow, ...remainingRows];

  // Keyboard Callbacks
  const keyboardKeyPressedCallBack = (attrsOfKeyThatUserClicked) => {
    if (stopGame)
      return;

    if (activeRowIdx === 0 && attrsOfKeyThatUserClicked.isBackspaceKey) {
      return; // activeRow is empty as such, there are no letters to erase.
    }

    if (attrsOfKeyThatUserClicked.isBackspaceKey) {
      const newActiveRow = activeRow.slice();
      newActiveRow[activeRowIdx - 1] = boxStyleVariants.blankBox;
      setActiveRow(newActiveRow);
      setActiveRowIdx(activeRowIdx - 1);
      //letterUsedNoMatch.pop();
      return;
    }

    if (activeRowIdx === numGuessAreaColumns && attrsOfKeyThatUserClicked.isEnterKey) {
      // Get the input word and checks if the word is in the json file.
      let inputWordToCompare = [];
      let inputWordToFind = ''
      activeRow.forEach((inActiveRow, index) => {
        inputWordToCompare.push(inActiveRow.letter.toLowerCase());
        inputWordToFind += inActiveRow.letter.toLowerCase();
      });
      //console.log(inputWordToFind);
      if (!ListOfWords.words.includes(inputWordToFind)) {
        textForInfo = 'That is not a word, Try again!'
        const newActiveRow = activeRow.slice();
        newActiveRow[activeRowIdx - 1] = boxStyleVariants.blankBox;
        setActiveRow(newActiveRow);
        setActiveRowIdx(activeRowIdx - 1);
  
        return; // UNCOMENT FOR BUILD
      }
      textForInfo = 'Type a 5 character word!'

      // Gets the answer to compare.
      let answerForCompare = [];
      for (let i = 0; i < answer.length; i++) {
        answerForCompare.push(answer.charAt(i));
      }

      // ++++++++++++++++++++++++++++++++++++++++++++++++
      // Check for correct character in row.
      const tempRow = activeRow.slice();
      tempRow.forEach(element => {
          element.letter = element.letter.toLowerCase();
      });
      let tempAnswer = [...answerForCompare]

      // Correct position.
      //tempAnswer = [...answerForCompare]
      let winCount = 0;
      inputWordToCompare.forEach((characterTocCompare, idx) => {
        let arrIndex = tempAnswer.indexOf(characterTocCompare);
        if (arrIndex !== -1 && inputWordToCompare[idx] === answerForCompare[idx]){
          tempRow[idx] = {...boxStyleVariants.exactMatch, letter: inputWordToCompare[idx],};
          tempAnswer.splice(arrIndex, 1);
            winCount++;
            if (winCount > 4){  // Win condition
              //console.log("Win");
              stopGame = true;
              win = true;
            }
          }
        });

      inputWordToCompare.forEach((characterTocCompare, idx) => {
        let arrIndex = tempAnswer.indexOf(characterTocCompare);
        if (arrIndex !== -1){
            tempRow[idx] = {...boxStyleVariants.partialMatch, letter: inputWordToCompare[idx],};
            tempAnswer.splice(arrIndex, 1);
          }
      });

      // No match
      for (let index = 0; index <inputWordToCompare.length; index++) { 
        if (tempRow[index].backgroundColor === boxStyleVariants.blankBox.backgroundColor && answerForCompare.includes(inputWordToCompare[index])) {
          tempRow[index] = {...boxStyleVariants.blankBox, letter: inputWordToCompare[index].toUpperCase(),};
        }        
        else if (tempRow[index].backgroundColor === boxStyleVariants.blankBox.backgroundColor && !tempAnswer.includes(inputWordToCompare[index])) {
          tempRow[index] = {...boxStyleVariants.noMatch, letter: inputWordToCompare[index].toUpperCase(),};
          letterUsedNoMatch.push(tempRow[index])
        }
      }

      let tempkeyboard = keyboard;
      for (let x = 0; x < letterUsedNoMatch.length; x++){
        for (let Y = 0; Y < tempkeyboard.length; Y++) {
          if (letterUsedNoMatch[x].letter ===  tempkeyboard[Y].letter){
            tempkeyboard[Y] = {...boxStyleVariants.noMatch, letter: letterUsedNoMatch[x].letter.toUpperCase()};
          } 
        }
      }
      letterUsedNoMatch = [];
      setKeyboard(tempkeyboard);


      // Make the temp row letters to Upper case letters.
      tempRow.forEach((element)=> {
        element.letter = element.letter.toUpperCase();
      })
      if (completedRows.length === 25){
        stopGame = true;
        setActiveRow(tempRow)
        return;
      }


      // Change to the next row.
      // Add the active line to completedRrow
      tempRow.forEach((element)=> {
        completedRows.push(element);
      })

      // Takes 5 from remaining rows
      for (let i = 0; i < 5; i++) {
        remainingRows.shift();
      }


      const newActiveRow = new Array(numGuessAreaColumns).fill(boxStyleVariants.notEvaluated);
      setActiveRow(newActiveRow);
      setActiveRowIdx(0); // Reset the column index to the first column.
      return;

      
    } // End of activeRowIdx === numGuessAreaColumns


    // ignore the enter key as there are not enough letters in activeRow
    if (attrsOfKeyThatUserClicked.isEnterKey) {
      return;
    }
    
    // activeRow is already full.
    if (activeRowIdx === numGuessAreaColumns) {
      return;
    }

    const newActiveRow = activeRow.slice();
    newActiveRow[activeRowIdx] = { ...boxStyleVariants.notEvaluated, letter: attrsOfKeyThatUserClicked.letter};
    setActiveRow(newActiveRow);
    setActiveRowIdx(activeRowIdx + 1);
    //letterUsedNoMatch.push(attrsOfKeyThatUserClicked);
    // console.log(JSON.stringify(activeRow));
  };


  return (
    <Fragment>
      <Box
        margin="auto"
        sx={{    
          width: 1000,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-top ",
          alignItems: 'center',
        }}>
        <TopBanner />
        <Typography
          sx={{
            fontSize: '32px',
            color: '#ffff00',
            fontWeight: 'bold',
          }}>
          {textForInfo}</Typography>
        <GuessArea guessAreaBoxes={allBoxes} />

        <Keyboard
          keyboard={keyboard}
          onClickCallback={keyboardKeyPressedCallBack}
        />
      </Box>
      <BasicModal toOpen={stopGame} toWin={win} />
      <Box
        sx={{
          paddingTop: '100px',
          mx: '20%'
        }} >
        <MessageCenter msg='Daniel Galarza' />

      </Box>


    </Fragment>
  );
}

export default App;
