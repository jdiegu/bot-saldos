const BalanceService = require("../../services/balance.service");
async function isAdmin(msg) {
  const chat = await msg.getChat();

  if (!chat.isGroup) return false;
  const contact = await msg.getContact();
  if (!contact?.id?._serialized) return false;
  const realId = contact.id._serialized;
  const participant = chat.participants.find(
    (p) => p.id._serialized === realId,
  );

  return Boolean(participant?.isAdmin || participant?.isSuperAdmin);
}

exports.consultar = async (msg, args) => {
  try {
    if (args.length === 1) {
      const contact = await msg.getContact();
      const saldo = await BalanceService.getBalance(contact.id.user);

      return msg.reply(`Tu saldo: $${saldo.balance}`);
    }

    if (!(await isAdmin(msg))) return msg.reply("Solo admins");

    const mentions = await msg.getMentions();

    if (!mentions.length) return msg.reply("Menciona usuario");
    console.log(mentions[0]);
    console.log(mentions[0].number);
    console.log(mentions[0].id);
    console.log(mentions[0].id.user);
    const saldo = await BalanceService.getBalance(mentions[0].id.user);

    return msg.reply(`Saldo usuario: $${saldo.balance}`);
  } catch (error) {
    return msg.reply(`Error: ${error.message}`);
  }
};

exports.agregar = async (msg, args) => {
  try {
    if (!(await isAdmin(msg))) return msg.reply("Solo admins");

    const mentions = await msg.getMentions();

    if (!mentions.length) return msg.reply("Menciona usuario");

    const amount = parseFloat(args[2]);

    if (isNaN(amount)) return msg.reply("Monto inválido");

    const result = await BalanceService.addBalance({
      user: mentions[0].id.user,

      amount,
    });

    msg.reply(
      `Saldo agregado

Nuevo saldo:
$${result.balance}`,
    );
  } catch (error) {
    msg.reply(`Error: ${error.message}`);
  }
};

exports.quitar = async (msg, args) => {
  try {
    if (!(await isAdmin(msg))) return msg.reply("Solo admins");

    const mentions = await msg.getMentions();

    if (!mentions.length) return msg.reply("Menciona usuario");

    const amount = parseFloat(args[2]);

    if (isNaN(amount)) return msg.reply("Monto inválido");

    const result = await BalanceService.removeBalance({
      user: mentions[0].id.user,

      amount,
    });

    msg.reply(
      `Saldo descontado

Nuevo saldo:
$${result.balance}`,
    );
  } catch (error) {
    msg.reply(`Error: ${error.message}`);
  }
};
