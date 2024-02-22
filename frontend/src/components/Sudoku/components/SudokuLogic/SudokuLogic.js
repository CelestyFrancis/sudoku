const Check = data => {
  let horizontalGrid = [];
  let verticalGrid = [];
  let squareGrid = [];
  const invalidIndices = [];
  data.forEach((item, i) => {
    item.forEach((element, j) => {
      if (element === 0) {
        invalidIndices.push(i + "" + j);
      }
    });
  });
  if (invalidIndices.length !== 0) {
    return invalidIndices;
  }
  horizontalGrid = data;
  horizontalGrid.forEach((item, i) => {
    let t = checkDuplicateHorizontal(item);
    if (t.length !== 0) {
      t.map(item => {
        invalidIndices.push(i + "" + item[0]);
        invalidIndices.push(i + "" + item[1]);
      });
    }
  });
  verticalGrid = getVerticalGrid(data);
  verticalGrid.forEach((item, i) => {
    let t = checkDuplicateHorizontal(item);
    if (t.length !== 0) {
      t.map(item => {
        invalidIndices.push(item[0] + "" + i);
        invalidIndices.push(item[1] + "" + i);
      });
    }
  });

  let map = new Map();
  map.set("00", "00");
  map.set("01", "01");
  map.set("02", "02");
  map.set("03", "10");
  map.set("04", "11");
  map.set("05", "12");
  map.set("06", "20");
  map.set("07", "21");
  map.set("08", "22");
  map.set("10", "03");
  map.set("11", "04");
  map.set("12", "05");
  map.set("13", "13");
  map.set("14", "14");
  map.set("15", "15");
  map.set("16", "23");
  map.set("17", "24");
  map.set("18", "25");
  map.set("20", "06");
  map.set("21", "07");
  map.set("22", "08");
  map.set("23", "16");
  map.set("24", "17");
  map.set("25", "18");
  map.set("26", "26");
  map.set("27", "27");
  map.set("28", "28");
  map.set("30", "30");
  map.set("31", "31");
  map.set("32", "32");
  map.set("33", "40");
  map.set("34", "41");
  map.set("35", "42");
  map.set("36", "50");
  map.set("37", "51");
  map.set("38", "52");
  map.set("40", "33");
  map.set("41", "34");
  map.set("42", "35");
  map.set("43", "43");
  map.set("44", "44");
  map.set("45", "45");
  map.set("46", "53");
  map.set("47", "54");
  map.set("48", "55");
  map.set("50", "36");
  map.set("51", "37");
  map.set("52", "38");
  map.set("53", "46");
  map.set("54", "47");
  map.set("55", "48");
  map.set("56", "56");
  map.set("57", "57");
  map.set("58", "58");
  map.set("60", "60");
  map.set("61", "61");
  map.set("62", "62");
  map.set("63", "70");
  map.set("64", "71");
  map.set("65", "72");
  map.set("66", "80");
  map.set("67", "81");
  map.set("68", "82");
  map.set("70", "73");
  map.set("71", "74");
  map.set("72", "75");
  map.set("73", "73");
  map.set("74", "74");
  map.set("75", "75");
  map.set("76", "83");
  map.set("77", "84");
  map.set("78", "85");
  map.set("80", "66");
  map.set("81", "67");
  map.set("82", "68");
  map.set("83", "76");
  map.set("84", "77");
  map.set("85", "78");
  map.set("86", "86");
  map.set("87", "87");
  map.set("88", "88");

  squareGrid = getSquareGrid(data);
  squareGrid.forEach((item, i) => {
    let t = checkDuplicateHorizontal(item);
    if (t.length !== 0) {
      t.map(item => {
        invalidIndices.push(
          map.get(i + "" + item[0]),
          map.get(i + "" + item[0])
        );
      });
    }
  });
  return invalidIndices;
};

const checkDuplicateHorizontal = data => {
  let duplicates = [];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (i !== j && data[i] === data[j]) {
        duplicates.push([i, j]);
      }
    }
  }
  return duplicates;
};

const getVerticalGrid = data => {
  const verticalGrid = [];
  for (let i = 0; i < 9; i++) {
    let vert = [];
    for (let j = 0; j < 9; j++) {
      vert.push(data[j][i]);
    }
    verticalGrid.push(vert);
  }
  return verticalGrid;
};

const getSquareGrid = data => {
  const squareGrid = [];
  [0, 3, 6].map(k => {
    [0, 3, 6].map(l => {
      let vert = [];
      [0, 1, 2].map(i => {
        [0, 1, 2].map(j => {
          vert.push(data[i + k][j + l]);
        });
      });
      squareGrid.push(vert);
    });
  });
  return squareGrid;
};

const SudokuLogic = {
  Check
};

export default SudokuLogic;
