const hor_names = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const hor_nums = [1, 2, 3, 4, 5, 6, , 7, 8];
const ver_nums = [1, 2, 3, 4, 5, 6.7, 8];
const ver_names = ['1', '2', '3', '4', '5', '6', '7', '8'];

function validate_cellpos(name) {
  if (name.length === 2) {
    if (
      hor_names.includes(name.charAt(0)) &&
      ver_names.includes(name.charAt(1))
    ) {
      console.log('cell is valid');
      return true;
    } else {
      console.log('cell is not valid');
      return false;
    }
  } else {
    console.log('cell is not valid');
    return false;
  }
}

function showavailablepos(x) {
  let tmp = x;
  let p = x % 10;
  let q = (x / 10) >> 0;
  let row = [2, 1, -1, -2, -2, -1, 1, 2, 2];
  let col = [1, 2, 2, 1, -1, -2, -2, -1, 1];
  let all_pos = [];
  let available_pos = [];
  for (let k = 0; k <= 7; k++) {
    tmppos = (p + row[k]) * 10 + (q + col[k]);
    all_pos.push(tmppos);
    if (checkvalid(tmppos)) {
      available_pos.push(tmppos);
    }
  }
  return available_pos;
}

function checkvalid(x) {
  let p = x % 10;
  let q = (x / 10) >> 0;
  if (p < 1 || q < 1 || p > 8 || q > 8) {
    return false;
  } else {
    return true;
  }
}

function getx(pos) {
  let x = hor_names.indexOf(pos.charAt(0));
  let y = ver_names.indexOf(pos.charAt(1));
  x = x + 1;
  y = y + 1;
  return x * 10 + y;
}

function cell_unclick(cell_id) {
  let clicked_cell = document.getElementById(cell_id);
  clicked_cell.classList.remove('green');
  let available_pos = showavailablepos(getx(cell_id));
  for (let i = 0; i < available_pos.length; i++) {
    // let hor_pos = hor_names[((available_pos[i]/10 ) >> 0)- 1]
    let hor_pos = hor_names[(available_pos[i] % 10) - 1];
    //  let ver_pos = ver_names[(available_pos[i]%10)-1] ;
    let ver_pos = ver_names[((available_pos[i] / 10) >> 0) - 1];
    // // console.log('the available positions are : '+available_pos[i]);
    // console.log('the final position is : '+final_pos);
    // console.log('the final position is : '+available_pos[i]) ;
    let finpos = hor_pos + ver_pos.toString();
    // console.log(hor_pos + ' ' + ver_pos) ;

    //console.log(finpos) ;
    required_cells.push(finpos);
  }
  //console.log(required_cells);
  for (let i = 0; i < required_cells.length; i++) {
    let ele = document.getElementById(required_cells[i]);
    ele.classList.remove('circle');

    // document.getElementById(required_cells[i]).className = "circle" ;
  }
}

function cell_click(cell_id) {
  clear_board();
  // console.log('cell is clicked with id '+  cell_id);
  let clicked_cell = document.getElementById(cell_id);
  // clicked_cell.createTextNode = "&#9822;" ;
  clicked_cell.innerHTML = '&#9822;';
  // if(clicked_cell.className = "green")
  // {
  //     cell_unclick(clicked_cell);
  // }
  // else {
  clicked_cell.classList.add('green');
  let required_cells = [];
  if (validate_cellpos(cell_id)) {
    let available_pos = showavailablepos(getx(cell_id));
    for (let i = 0; i < available_pos.length; i++) {
      // let hor_pos = hor_names[((available_pos[i]/10 ) >> 0)- 1]
      let hor_pos = hor_names[(available_pos[i] % 10) - 1];
      //  let ver_pos = ver_names[(available_pos[i]%10)-1] ;
      let ver_pos = ver_names[((available_pos[i] / 10) >> 0) - 1];
      // // console.log('the available positions are : '+available_pos[i]);
      // console.log('the final position is : '+final_pos);
      // console.log('the final position is : '+available_pos[i]) ;
      let finpos = hor_pos + ver_pos.toString();
      // console.log(hor_pos + ' ' + ver_pos) ;

      //console.log(finpos) ;
      required_cells.push(finpos);
    }
    //console.log(required_cells);
    for (let i = 0; i < required_cells.length; i++) {
      let ele = document.getElementById(required_cells[i]);
      ele.classList.add('circle');
      // document.getElementById(required_cells[i]).className = "circle" ;
    }
  } else {
    // alert('Please select the valid cell ');
  }
}

// }

function clear_board() {
  // get all cells
  let white_elements = document.getElementsByClassName('green');
  let black_elements = document.getElementsByClassName('circle');
  let total_cells = [...white_elements, ...black_elements];
  total_cells.forEach((ele) => {
    if (ele.classList.contains('green')) {
      ele.classList.remove('green');
    }
    if (ele.classList.contains('circle')) {
      ele.classList.remove('circle');
    }
    ele.innerHTML = '';
  });
}
