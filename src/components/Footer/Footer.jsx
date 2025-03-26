import { useContext } from 'react';
import { ModalContext } from '../../context';
import Danil from "../../assets/team/Danil.jpg"

import {
  AnimationSvg,
  ButtonTeam,
  FooterWrapper,
  Text,
  ImageWrapper,
  InfoTeamWrapper,
  ListWrapper,
  TextPositionModal,
  TitleModal,
  UlWrapper,
  IconGitHub,
  IconLinkedIn,
  TextTeamPosition,
  IconsWrapper,
  IconLink,
  IconTelegram,
  TextGlobal,
  GlobalWrapperTeam,
  ListWrapperOnDescription,
} from './Footer.styled';


export const Footer = () => {
  const { openModal } = useContext(ModalContext);

  const handleClickButton = () => {
    openModal(
      <>
        <GlobalWrapperTeam>
          <UlWrapper>
            <ListWrapper>
              <ImageWrapper src={Danil} alt="Danil" />
              <InfoTeamWrapper>
                <TextPositionModal>Danil Turasov</TextPositionModal>
                <IconsWrapper>
                  <IconLink href="https://github.com/DanilTop3245">
                    <IconGitHub />
                  </IconLink>
                  <IconLink href="https://www.linkedin.com/in/danil-turasov-01b195274/">
                    <IconLinkedIn />
                  </IconLink>
                  <IconLink href="https://t.me/procherk09">
                    <IconTelegram />
                  </IconLink>
                </IconsWrapper>
              </InfoTeamWrapper>
            </ListWrapper>
            <ListWrapperOnDescription>
              <TextTeamPosition>Fullstack Developer</TextTeamPosition>
              <TextTeamPosition>
                I am a beginner full-stack developer, I developed this project for practice and
                repetition of some libraries. In this project I used React and Node.
              </TextTeamPosition>
            </ListWrapperOnDescription>
          </UlWrapper>
        </GlobalWrapperTeam>
      </>
    );
  };

  return (
    <>
      <FooterWrapper>
        <Text>&copy; 2024 | Developed with</Text>
        <AnimationSvg />
        <ButtonTeam onClick={handleClickButton}>by Danil Turasov</ButtonTeam>
      </FooterWrapper>
    </>
  );
};
