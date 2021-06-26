export function checkUsername(rules, value, callback) {
  if (!value) {
    return callback(new Error("学号不能为空"));
  } else if (!Number.isInteger(value)) {
    return callback(new Error("学号必须为10位数字"));
  } else if (/^\d{10}$/.test(value) == false) {
    return callback(new Error("学号必须为10位数字"));
    // 对学号格式的判断
  } else if (/^(3[12])\d{8}$/.test(value) == false) {
    return callback(new Error("请输入合法的学号"));
  } else callback();
}

export function checkPwd(rules, value, callback) {
  if (!value) {
    return callback(new Error("密码不能为空"));
  } else if (
    // 对密码的判断
    /^(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{8,16}$/.test(value) == false
  ) {
    return callback(new Error("密码必须为8-16位的字母+数字的组合"));
  } else callback();
}

export function checkPhone(rules, value, callback) {
  if (!value) {
    return callback(new Error("手机号码不能为空"));
  } else if (
    /^(1)\d{10}$/.test(value) == false
  ) {
    return callback(new Error("请输入正确的手机号码"));
  } else callback();
}