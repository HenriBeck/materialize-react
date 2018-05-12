// @flow strict

import React, {
  type ChildrenArray,
  type Element,
} from 'react';
import PropTypes from 'prop-types';

import Backdrop from '../Backdrop';
import createSheet from '../../styles/create-sheet';
import { up } from '../../utils/breakpoints';
import { cloneChildren } from '../../utils/react';
import { type Theme } from '../../theme/types';

import Dialog from '.';

type DialogElement = Element<typeof Dialog>;
type Props = {
  children: ChildrenArray<DialogElement>,
  className: string,
};
type Data = { hasActiveDialog: boolean };

const Sheet = createSheet('Dialog-Container', (theme: Theme) => {
  return {
    container: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: theme.zIndexes.dialog,
      padding: 32,
      transform: (data: Data) => `scale(${data.hasActiveDialog ? 1 : 0})`,

      [up(theme, 'tablet')]: { padding: 64 },
    },
  };
});

export default class Container extends React.PureComponent<Props> {
  static propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
  };

  static defaultProps = { className: '' };

  static getCurrentDialog(props: Props): ?Element<typeof Dialog> {
    return React
      .Children
      .toArray(props.children)
      .find(dialog => dialog.props.isOpen);
  }

  handleBackdropClick = (ev: SyntheticMouseEvent<HTMLDivElement>) => {
    const dialog = Container.getCurrentDialog(this.props);

    if (dialog && dialog.props.onCloseRequest) {
      dialog.props.onCloseRequest(ev);
    }
  };

  renderDialogs() {
    let isFirstOpenDialog = true; // eslint-disable-line fp/no-let

    return cloneChildren(
      this.props.children,
      (child: DialogElement) => {
        if (child.props.isOpen && isFirstOpenDialog) {
          isFirstOpenDialog = false;

          return { isOpen: true };
        }

        return { isOpen: false };
      },
    );
  }

  render() {
    const dialog = Container.getCurrentDialog(this.props);
    const hasBackdrop = Boolean(dialog && dialog.props.backdrop && !dialog.props.fullscreen);
    const data: Data = { hasActiveDialog: Boolean(dialog) };

    return (
      <Sheet data={data}>
        {({ classes }) => (
          <div
            aria-modal
            className={`${classes.dialogContainer} ${this.props.className}`}
          >
            <Backdrop
              active={hasBackdrop}
              onClick={this.handleBackdropClick}
            />

            {this.renderDialogs()}
          </div>
        )}
      </Sheet>
    );
  }
}

