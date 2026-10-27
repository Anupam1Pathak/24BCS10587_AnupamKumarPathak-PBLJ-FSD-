    const       VALID_DISCOUNT_CODES = ["CAMPUS50",      "EARLYBIRD"];
function      calculateFinalAmount   (ticketPrice,         discountCode) {
  const code =      discountCode ?      String(discountCode).trim().toUpperCase() :   "";

  if          (code    && !VALID_DISCOUNT_CODES.includes(code)) {
    const          error = new Error("Invalid ");
           error.statusCode =       400;throw       error;

  }

  if(    !code)   return             ticketPrice;
if (code    === "CAMPUS50")             return Number(    (ticketPrice * 0.5).toFixed(2));
  if (code      ===    "     EARLYBIRD") return      Math.max(0,   ticketPrice    - 100);
  return     ticketPrice;}

function    getValidationMessages(    error) {
return     Object.values(error.errors   ||     {}).map((item) =>     item.message);}

module.exports =                             {
                             calculateFinalAmount,
      getValidationMessages,};
