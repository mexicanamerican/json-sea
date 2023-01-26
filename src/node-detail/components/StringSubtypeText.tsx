import { memo } from 'react';
import { useStringSubtypeValidator } from '../primitive/hooks/useStringSubtypeValidator';

type Props = {
  value: string;
};

/**
 * @returns e.g. '/color', '/image', '/imageUri', etc
 */
const _StringSubtypeText = ({ value }: Props) => {
  const { isColor, isDatetime, isEmail, isHttpUri, isImage, isImageUri, isAudio, isAudioUri, isVideo, isVideoUri } =
    useStringSubtypeValidator(value);

  return (
    <>
      {isColor && '/color'}
      {isDatetime && '/datetime'}
      {isEmail && '/email'}
      {isHttpUri && '/uri'}
      {isImage && '/image'}
      {isImageUri && '/imageUri'}
      {isAudio && '/audio'}
      {isAudioUri && '/audioUri'}
      {isVideo && '/video'}
      {isVideoUri && '/videoUri'}
    </>
  );
};

export const StringSubtypeText = memo(_StringSubtypeText);
