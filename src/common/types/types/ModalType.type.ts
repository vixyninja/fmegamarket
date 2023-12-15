export type ModalType = {
  title: string;
  content: string;
  isShow: boolean;
  leftButtonTitle: string;
  onLeftPress: () => void;
  rightButtonTitle: string;
  onRightPress: () => void;
};
