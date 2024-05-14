// import { DragHandleIcon } from '@chakra-ui/icons';
import { DragVertical } from '@carbon/icons-react';
// import { IconButton } from '@chakra-ui/react';
import { ButtonCentered } from '@carbon/icons-react';
// import type { ComponentPropsWithRef } from 'react';
import * as React from 'react';
import { forwardRef } from 'react';
// import type { DragHandleProps } from 'react-querybuilder';

// type IBP = ComponentPropsWithRef<typeof IconButton>;

// export type ChakraDragHandleProps = DragHandleProps &
//   Omit<IBP, 'aria-label'> &
//   Partial<Pick<IBP, 'aria-label'>>;
const CarbonDragHandle = forwardRef(
  (
    {
      className,
      title,
      disabled,
      // Props that should not be in extraProps
      testID: _testID,
      level: _level,
      path: _path,
      label: _label,
      context: _context,
      validation: _validation,
      schema: _schema,
      ruleOrGroup: _ruleOrGroup,
      ...extraProps
    },
    dragRef
  ) => (
    // <DragVertical ref={dragRef} className={className} title={title} {...extraProps} />
    <span ref={dragRef} className={className} title={title} ghostClass={'d-none'}>
      <DragVertical isDisabled={disabled} aria-label={title ?? /* istanbul ignore next */ ''} {...extraProps} />
    </span>
  )
);
export default CarbonDragHandle;
