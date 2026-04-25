const saldoCommand=require('./commands/saldo.command');

module.exports=async(msg)=>{

 const text=msg.body.trim();

 if(!text.startsWith("!"))
   return;

 const args=text.split(" ");

 const command=args[0].toLowerCase();


 switch(command){

   case '!saldo':
      return saldoCommand.consultar(msg,args);


   case '!agregar':
      return saldoCommand.agregar(msg,args);


   case '!quitar':
      return saldoCommand.quitar(msg,args);

   default:
      return msg.reply(
`Comandos:

!saldo
!saldo @usuario

Admins:
!agregar @usuario monto
!quitar @usuario monto`
      );

 }

}