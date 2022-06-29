//https://github.com/prisma/studio/issues/614

;(BigInt.prototype as any).toJSON = function () {
  return this.toString()
}
