module.exports =
  ({ format = n => n } = {}) =>
    (start = process.hrtime.bigint()) =>
      () =>
        format(Number(process.hrtime.bigint() - start) / 1e6)
