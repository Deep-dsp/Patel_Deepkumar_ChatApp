export default{
    props:['msg', 'socketid'],

    template:
    `
        <article class="new-message" :class="{'my-messages': matchedID}">
            <h4>{{msg.message.name}} says:</h4>
            <p>{{msg.message.content}}</p>
            <p>This is a message</p>
        </article>
    `,

    data:function(){
        return {
            matchedID: this.socketid == this.msg.id
        }
    }
}