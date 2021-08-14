var radioButtonListCmp = new Vue({
    el: '#radioButtonListCmp',
    data: {
      radioButtonList: getRadioButtonList()
    }
})

function getRadioButtonList(){
  let radioButtonList = [];
  const languageList = ['English', 'Espanol', 'Русский', 'Українська'];
  let idCounter = 0;
  for(const language of languageList){
    radioButtonList.push({
      id: idCounter++,
      label: language
    });
  }
  radioButtonList[0].checked = true;

  return radioButtonList;
}