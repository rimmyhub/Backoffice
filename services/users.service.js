const UserRepository = require('../repositories/users.repository');

class UserService {
  userRepository = new UserRepository();

  // 프로필 사진 업로드
  uploadProfileImage = async (imageUrl, client_id) => {
    const uploadedProfileImage = await this.userRepository.createProfileImage(imageUrl, client_id);
    return uploadedProfileImage;
  };

  // 프로필 사진 가져오기
  getProfileImage = async (client_id) => {
    const getProfileImage = await this.userRepository.findProfileImage(client_id);
    return getProfileImage[getProfileImage.length - 1]; // 가장 최신에 업로드한 사진만 가져옴
  };

  // 전체 유저 정보 공개(테스트용)
  findAllUsers = async () => {
    const findUserData = await this.userRepository.findAllUsers();
    return findUserData.map((user) => {
      return {
        client_id: user.client_id,
        email: user.email,
        password: user.password,
        name: user.name,
        address: user.address,
        phone_num: user.phone_num,
        client_image: user.client_image,
        introduction: user.introduction,
        point: user.point,
      };
    });
  };

  // 일반 정보 공개 (민감 정보, 불필요한 정보 제외, 외부 유출이 불필요한 정보)
  findUserCommonData = async (userInfo) => {
    // id와 email 둘 중 하나라도 찾으면 해당하는 유저 정보 보냄
    const findUserData =
      (await this.userRepository.findUserById(userInfo)) ??
      (await this.userRepository.findUserByEmail(userInfo));

    if (findUserData === null) return false; // 조회 결과 없으면 false
    return {
      client_id: findUserData.client_id,
      email: findUserData.email,
      name: findUserData.name,
      address: findUserData.address,
      phone_num: findUserData.phone_num,
      client_image: findUserData.client_image,
      introduction: findUserData.introduction,
      point: findUserData.point,
    };
  };

  // 모든 정보 공개
  findUserAllData = async (userInfo) => {
    const findUserData =
      (await this.userRepository.findUserById(userInfo)) ??
      (await this.userRepository.findUserByEmail(userInfo));

    if (findUserData === null) return false; // 조회 결과 없으면 false
    return findUserData;
  };

  // 유저 정보 수정
  modifyUserInfo = async (client_id, introduction, address, phone_num) => {
    const modifiedUserData = await this.userRepository.modifyUserInfo(
      client_id,
      introduction,
      address,
      phone_num
    );
    return modifiedUserData;
  };

  // 유저 비밀번호 수정
  modifyUserPassword = async (client_id, password) => {
    const modifiedUserPassword = await this.userRepository.modifyUserPassword(client_id, password);
    return modifiedUserPassword;
  };
}

module.exports = UserService;
