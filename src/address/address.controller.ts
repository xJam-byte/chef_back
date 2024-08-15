import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./Dto/create.address.dto";

@Controller("address")
export class AddressController {
  constructor(private addrService: AddressService) {}

  @Get("/ofOne")
  getAll(@Query("userId", ParseIntPipe) userID: number) {
    return this.addrService.getAllAddresses(userID);
  }

  @Post("/addOne")
  addAddrForCustomer(@Body() addr: CreateAddressDto) {
    return this.addrService.addOneForCustomer(addr);
  }
}
