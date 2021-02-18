import ChatMessage from "./components/TheMessageComponent.js";

(()=>{
    console.log("chat starts here.");

    // load socket library and make connection
    const socket = io();

    // messanger service event handling -> incoming from manager
    function setUserID({sID, message, username}){
        // debugger;

        vm.socketID = sID;
        vm.name = username;
    }

    function appendMessage(message, username){
        vm.messages.push(message);
        // vm.name.push(username);
    }

    //  VUE JS
    const vm = new Vue({
        data:{
            messages:[],
            // name:[],
            // username:"",
            socketID:"",
            message:"",
            userindex:""
        },

        created:function(){
            console.log("its alive");
        },

        methods:{
            displatchMessage(){
                // debugger;
                
                var d = new Date();
                var date = (d.getMonth()+1)+ "/" + d.getDate() + "/" + d.getFullYear() + "   ";
                var time = date + d.getHours() + ":" + d.getMinutes();
                socket.emit('chatmessage', {content: this.message, name: this.username, date: time || "Anonymous"});
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