const OwnerRepository = require('../repositories/owners.repository');

class OwnerService {
  ownerRepository = new OwnerRepository();

  // 전체 유저 정보 공개(테스트용)
  findAllUsers = async () => {
    const findUserData = await this.ownerRepository.findAllUsers();
    return findUserData.map((user) => {
      return {
        owner_id: user.owner_id,
        email: user.email,
        password: user.password,
        name: user.name,
        owner_name: user.owner_name,
        owner_number: user.owner_number,
        point: user.point,
      };
    });
  };

  // 일반 정보 공개 (민감 정보, 불필요한 정보 제외, 외부 유출이 불필요한 정보 제외)
  findUserCommonData = async (userInfo) => {
    // id와 email 둘 중 하나라도 찾으면 해당하는 유저 정보 보냄
    const findUserData =
      (await this.ownerRepository.findUserById(userInfo)) ??
      (await this.ownerRepository.findUserByEmail(userInfo));

    if (findUserData === null) return false; // 조회 결과 없으면 false
    return {
      owner_id: findUserData.owner_id,
      email: findUserData.email,
      name: findUserData.name,
      owner_name: findUserData.owner_name,
      owner_number: findUserData.owner_number,
      point: findUserData.point,
    };
  };

  // 모든 정보 공개
  findUserAllData = async (userInfo) => {
    const findUserData =
      (await this.ownerRepository.findUserById(userInfo)) ??
      (await this.ownerRepository.findUserByEmail(userInfo));

    if (findUserData === null) return false; // 조회 결과 없으면 false
    return findUserData;
  };

  // 유저 정보 수정
  modifyUserInfo = async (owner_id, owner_name, owner_number) => {
    const modifiedUserData = await this.ownerRepository.modifyUserInfo(
      owner_id,
      owner_name,
      owner_number
    );
    return modifiedUserData;
  };

  // 유저 비밀번호 수정
  modifyUserPassword = async (owner_id, password) => {
    const modifiedUserPassword = await this.ownerRepository.modifyUserPassword(owner_id, password);
    return modifiedUserPassword;
  };
}

module.exports = OwnerService;
