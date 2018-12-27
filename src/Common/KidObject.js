export default class KidObject {
  constructor(
    _name,
    _age,
    _schoolType,
    _quota,
    _paymentPeriod,
    _paymentDate,
    _provinceId,
    _cityId,
    _moneyIncludes
  ) {
    this.name = _name;
    this.age = _age;
    this.schoolType = _schoolType;
    this.quota = _quota;
    this.paymentPeriod = _paymentPeriod;
    this.paymentDate = _paymentDate;
    this.provinceId = _provinceId;
    this.cityId = _cityId;
    this.moneyIncludes = _moneyIncludes;
  }

  static fromObject(obj) {
    return new KidObject(
      obj.name,
      obj.age,
      obj.schoolType,
      obj.quota,
      obj.paymentPeriod,
      obj.paymentDate,
      obj.provinceId,
      obj.cityId,
      obj.moneyIncludes
    );
  }
}
