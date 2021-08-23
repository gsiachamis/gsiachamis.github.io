window.addEventListener('load',function(){
    let tab1 = document.getElementById("Bio");
    let tab2 = document.getElementById("Education");
    let tab3 = document.getElementById("Publications");

    tab3.style.color = "white";
    tab3.style.textShadow = "0px 0px 5px #ced0d3";

    tab1.style.color = "rgba(226, 226, 226, 0.8)";
    tab2.style.color = "rgba(226, 226, 226, 0.8)";

    document.getElementById("mail_icon").addEventListener('click', () => copy_mail());

});

function copy_mail(){
    document.getElementById("mail_text").select();
    document.execCommand("copy");
    console.log("copied!");
}