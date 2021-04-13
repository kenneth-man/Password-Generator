'use strict';

const passwordArea = document.querySelector('#password');
const btnCopy = document.querySelector('#btn-copy');
const btnGenerate = document.querySelector('#btn-generate');
const settings = document.querySelectorAll('.setting');

//matching variable names with element ids; used to determine which checkbox/es were checked
const settingUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const settingLowercase = 'abcdefghijklmnopqrstuvwxyz';
const settingNumbers = '0123456789';
const settingSymbols = ',./;#[]<>?:@~{}!"£$%^&*()-=_+`¬|';

const charsArr = [
    {
        name: 'settingUppercase',
        value: settingUppercase
    }, 

    {
        name: 'settingLowercase',
        value: settingLowercase
    },

    {
        name: 'settingNumbers',
        value: settingNumbers
    }, 

    {
        name: 'settingSymbols',
        value: settingSymbols
    }
];

//array of all chosen setting DOM variables
let selectionArr = [];
//chosen length of password
let passwordLength;

//generate a random password based on the settings chosen in UI
const generatePassword = (length) => {
    let result = [];
    let counter = 0;

    //join() doesn't mutate original array; it returns a new string
    const selectionString = selectionArr.join('');
    console.log(selectionString);

    while(counter < length){
        result.push(selectionString.charAt(Math.round(Math.random() * selectionString.length)));
        counter+=1;
    }

    passwordArea.textContent  = `${result.join('')}`;

    //reset selection array; prevent infinite accumulation of characters
    selectionArr = [];
}

//copy generated password to clipboard and alert user
const copyToClipboard = () => {
    if(!passwordArea.value) {
        alert('Please generate a password first before copying to clipboard');
        return;
    }
    
    //select() only works for textareas and inputs
    passwordArea.select();

    //for mobile devices
    passwordArea.setSelectionRange(0, 99999); 

    //Copy the text
    document.execCommand("copy");

    alert(`Copied the text: ${passwordArea.value}`);
}

//'copy to clipboard' button
btnCopy.addEventListener('click', copyToClipboard);

//'generate password' button
btnGenerate.addEventListener('click', () => {
    settings.forEach(curr => {
        if(curr.lastElementChild.classList.contains('checkbox') && curr.lastElementChild.checked === true) {
            let obj = charsArr.find(el => el.name === curr.id);
            selectionArr.push(obj.value);
        }
        else if(curr.lastElementChild.classList.contains('input')) passwordLength = curr.lastElementChild.value;
    });

    //if no checkboxes selected, alert user, don't generate password
    if(selectionArr.length === 0) {
        alert('Please check atleast one checkbox to generate a password ❗ ❗ ❗');
        return;
    }

    generatePassword(passwordLength);
})