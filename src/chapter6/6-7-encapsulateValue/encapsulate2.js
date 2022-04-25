let defaultOwnerData = {lastName: "이", firstName: "신호"};

export function defaultOwner2() {
	// 복제
	return Object.assign({}, defaultOwnerData);
}
export function setDefaultOwner2(arg) {
	defaultOwnerData = arg;
}
