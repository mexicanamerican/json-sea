import { styled, Text, useTheme } from '@nextui-org/react';
import { memo } from 'react';
import { Handle, Position } from 'reactflow';
import { useRecoilValue } from 'recoil';
import { validateJsonDataType } from '../../store/json-engine/helpers/json-data-type.helper';
import { hoveredNodeDetailCardAtom } from '../../store/node-detail-view/node-detail-view.atom';
import { sizes } from '../../ui/constants/sizes.constant';
import { encloseDoubleQuote } from '../../utils/string.util';

type Props = {
  nodeId: string;
  propertyK: string;
  propertyV: any;
  hasChildNode: boolean;
};

const _ObjectNodeProperty = ({ nodeId, propertyK, propertyV, hasChildNode }: Props) => {
  const hoveredNodeDetailCard = useRecoilValue(hoveredNodeDetailCardAtom);
  const { theme } = useTheme();

  const { isPrimitiveData } = validateJsonDataType(propertyV);

  const isHoveredFromNodeDetail: boolean =
    hoveredNodeDetailCard?.nodeId === nodeId && hoveredNodeDetailCard?.propertyK === propertyK;

  return (
    <StyledHost>
      <Text color="primary" weight="semibold" css={{ marginRight: '$8' }}>
        {/* TODO: Styling */}
        {isHoveredFromNodeDetail && '(me!)'}
        {encloseDoubleQuote(propertyK)}
      </Text>

      {isPrimitiveData && (
        <Text
          css={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          {JSON.stringify(propertyV)}
        </Text>
      )}

      {hasChildNode && (
        <Handle
          style={{ backgroundColor: theme?.colors.gray400.value }}
          id={propertyK}
          type="source"
          position={Position.Right}
        />
      )}
    </StyledHost>
  );
};

const StyledHost = styled('div', {
  position: 'relative',
  height: sizes.nodeContentHeight,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingRight: '$4',

  '& + &': {
    borderTop: '1px solid $gray400',
  },
});

export const ObjectNodeProperty = memo(_ObjectNodeProperty);
