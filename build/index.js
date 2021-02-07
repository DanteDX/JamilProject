const AllNames = document.querySelector('#AllNames');
// defining functions to interact with the firestore
const savingData = (info) =>{

}

const deleteData = (id) =>{
    db.collection('JamilNames').doc(id).delete();
    console.log('Reached Delete Data');
    AllNames.innerHTML = "";
    fetchingData();
}

const renderingData = (id,data) =>{
    const eachName = document.createElement('div');
    eachName.className = "eachName";
    eachName.setAttribute('dataId',id);

    const firstNameP = document.createElement('p');
    firstNameP.className = "firstNameP";
    firstNameP.innerText = `First Name: ${data.firstName}`;

    const middleNameP = document.createElement('p');
    middleNameP.className = "middleNameP";
    middleNameP.innerText = `Middle Name: ${data.middleName}`;

    const lastNameP = document.createElement('p');
    lastNameP.className = "lastNameP";
    lastNameP.innerText = `Last Name: ${data.lastName}`;

    const cross = document.createElement('span');
    cross.innerText = "Delete this entry";
    cross.class="deleteCross";
    cross.setAttribute('style','color:red;cursor:pointer;');
    cross.addEventListener('click',(event) => deleteData(id));

    eachName.appendChild(firstNameP);
    eachName.appendChild(middleNameP);
    eachName.appendChild(lastNameP);
    eachName.appendChild(cross);

    AllNames.appendChild(eachName);
}

const fetchingData = () =>{
    db.collection('JamilNames').where("firstName","==","Jamil").orderBy("middleName").get()
        .then(snapShot =>{
            const info = snapShot.docs;
            info.forEach(eachDoc =>{
                renderingData(eachDoc.id,eachDoc.data());
            })
        })
}

fetchingData();
document.querySelector('#mainForm').addEventListener('submit',function(e){
    e.preventDefault();
    //getting data from the form
    const firstName = e.target.firstName.value;
    const middleName = e.target.middleName.value;
    const lastName = e.target.lastName.value;
    // resetting the form values
    e.target.firstName.value = "";
    e.target.middleName.value = "";
    e.target.lastName.value = "";
    //sending info to firestore
    db.collection('JamilNames').add({firstName,middleName,lastName});
    AllNames.innerHTML = "";
    fetchingData();
})