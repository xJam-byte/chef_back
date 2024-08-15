import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Address } from "./address.model";
import { CreateAddressDto } from "./Dto/create.address.dto";

@Injectable()
export class AddressService {
  constructor(
    @InjectModel(Address) private readonly addrRepository: typeof Address
  ) {}
  async addOneForCustomer(addr: CreateAddressDto) {
    const responce = this.addrRepository.create(addr);
    return responce;
  }

  async getAllAddresses(uid: number) {
    const addresses = await this.addrRepository.findAll({
      where: { userId: uid },
    });

    if (addresses.length === 0) {
      return [];
    } else {
      return addresses;
    }
  }
}
