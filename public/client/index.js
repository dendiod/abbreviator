var radioButtonListCmp = new Vue({
    el: '#radioButtonListCmp',
    data: {
      radioButtonList: getRadioButtonList()
    }
})

function getRadioButtonList(){
  let radioButtonList = [];
  const languageLabelList = ['English', 'Espanol', 'Русский', 'Українська'];
  
  let idCounter = 0;
  let cssClass = 'form-check ';  
  for(const language of languageLabelList){
    radioButtonList.push({
	  value: languageValueList[idCounter],
      id: 'radioButton' + idCounter++,	  
      label: language,
	  cssClass: cssClass + 'col-sm-1'
    });
  }
  radioButtonList[languageLabelList.length-1].cssClass = cssClass + 'col-sm-2';
  radioButtonList[0].checked = true;

  return radioButtonList;
}