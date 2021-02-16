import ChatMessage from "./components/TheMessageComponent.js";


(()=>{
    console.log("chat starts here.");

    // load socket library and make connection
    const socket = io();

    // messanger service event handling -> incoming from manager
    function setUserID({sID, message}){
        // debugger;

        vm.socketID = sID;
    }

    function appendMessage(message){
        vm.messages.push(message);
    }

    //  VUE JS
    const vm = new Vue({
        data:{
            messages:[],
            nickname:"",
            username:"",
            socketID:"",
            message:""
        },

        created:function(){
            console.log("its alive");
        },

        methods:{
            displatchMessage(){
                // debugger;
                socket.emit('chatmessage', {content: this.message, name: this.nickname || "Anonymous"});
                this.message = ""; //Make textarea clear once we hit send button
            }
        },

        components:{
            newmessage: ChatMessage
        }
    }).$mount("#app");

    socket.addEventListener("connected", setUserID);
    socket.addEventListener('message', appendMessage);
})();