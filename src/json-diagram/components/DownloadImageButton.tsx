import { CircularProgress, semanticColors } from '@nextui-org/react';
import { toPng } from 'html-to-image';
import { memo, useCallback } from 'react';
import { CircleTransparentButton } from '../../ui/components/CircleTransparentButton';
import { Icon } from '../../ui/icon/Icon';
import { downloadAsFile } from '../../utils/file-download.util';
import { useBoolean } from '../../utils/react-hooks/useBoolean';
import { useCustomTheme } from '../../utils/react-hooks/useCustomTheme';

const _DownloadImageButton = () => {
  const { theme } = useCustomTheme();
  const { bool: isDownloading, setTrue: startDownload, setFalse: stopDownload } = useBoolean();

  const SELF_CLASSNAME = 'download-image-button';

  const handleClick = useCallback(() => {
    startDownload();

    toPng(document.querySelector('.react-flow') as HTMLElement, {
      filter: (node) => {
        // we don't want to add the minimap, controls and download image button to the image
        const filterTargetTokens = ['react-flow__minimap', 'react-flow__controls', SELF_CLASSNAME];

        const isFilterTargetToken: boolean = filterTargetTokens.some(
          (token: string) => node?.classList?.contains(token),
        );

        return !isFilterTargetToken;
      },
    })
      .then((dataUrl: string) => downloadAsFile(dataUrl, 'json-sea.png'))
      .finally(() => stopDownload());
  }, [startDownload, stopDownload]);

  return (
    <CircleTransparentButton
      style={{
        position: 'absolute',
        right: 8,
        top: 8,
        zIndex: 10,
      }}
      className={SELF_CLASSNAME}
      onClick={isDownloading ? undefined : handleClick}
    >
      {isDownloading ? (
        <CircularProgress color="default" size="sm" />
      ) : (
        <Icon icon="camera" size={24} color={semanticColors[theme].default[500]} />
      )}
    </CircleTransparentButton>
  );
};

/**
 * @see https://reactflow.dev/docs/examples/misc/download-image/
 */
export const DownloadImageButton = memo(_DownloadImageButton);
