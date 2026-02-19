function dosomething(){
    throw new Error("Something went wrong");

}
function init(){
    try{
        dosomething();
    }
     catch(e){
        console.log(e);
    }console.log("after succesfully handling the error");
    
}
init();
