window.addEventListener('load',function(){

    let tab1 = document.getElementById("Bio");
    let tab2 = document.getElementById("Education");

    let url = window.location.hash;

    if(url === "#Bio"){
        showContent("Bio");
    }else if(url === "#Education"){
        showContent("Education");
    }else{
        showContent("Bio");
    }

    tab1.addEventListener('focus', () => showContent("Bio"));

    tab2.addEventListener('focus', () => showContent("Education"));

    tab1.addEventListener('click', () => showContent("Bio"));
    
    tab2.addEventListener('click', () => showContent("Education"));

    document.getElementById("mail_icon").addEventListener('click', () => copy_mail());

    document.getElementById("mail_text").addEventListener('click', () => copy_mail());

});

function showContent(tab){
    let tablink1 = document.getElementById("Bio");
    let tablink2 = document.getElementById("Education");
    let bio_tab = document.getElementById("Bio_tab");
    let education_tab = document.getElementById("Education_tab");

    if(tab === "Bio"){
        bio_tab.style.display = "block";
        education_tab.style.display = "none";
        tablink1.style.color = "white";
        tablink1.style.textShadow = "0px 0px 5px #ced0d3";
        tablink2.style.color = "rgba(226, 226, 226, 0.8)";
        tablink2.style.textShadow = "none";
    }
    else if(tab === "Education"){
        education_tab.style.display="block";
        bio_tab.style.display="none";
        tablink2.style.color = "white";
        tablink2.style.textShadow = "0px 0px 5px #ced0d3";
        tablink1.style.color = "rgba(226, 226, 226, 0.8)";
        tablink1.style.textShadow = "none";
    }
}

function copy_mail(){
    document.getElementById("mail_text").select();
    document.execCommand("copy");
    alert("Mail copied successfully.")
    console.log("copied!");
}