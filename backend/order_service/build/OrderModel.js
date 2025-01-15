"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = exports.Order = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const ProductModel_1 = require("./ProductModel");
class Item {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Item.prototype, "amount", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: ProductModel_1.Product }),
    __metadata("design:type", Object)
], Item.prototype, "_id", void 0);
class Order {
}
exports.Order = Order;
__decorate([
    (0, typegoose_1.prop)({ type: () => [Item], required: true }),
    __metadata("design:type", Array)
], Order.prototype, "orderItems", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Order.prototype, "totalPrice", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, enum: ['PENDING', 'SUCCESS', 'FAILED'], default: 'PENDING' }),
    __metadata("design:type", String)
], Order.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: false }),
    __metadata("design:type", String)
], Order.prototype, "user", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, }),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
exports.OrderModel = (0, typegoose_1.getModelForClass)(Order);
