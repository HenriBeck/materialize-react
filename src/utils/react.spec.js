// @flow strict

import React from 'react';
import test from 'ava';
import sinon from 'sinon';

import {
  cloneChildren,
  cloneElement,
} from './react';

test('cloneElement: should clone an element with a new classname', (t) => {
  const div = <div>Hello</div>;
  const clonedDiv = cloneElement(div, { className: 'classname' });

  t.deepEqual(clonedDiv.props.className, 'classname');
});

test('cloneElement: should not override the classname', (t) => {
  const div = <div className="classname">Hello</div>;
  const clonedDiv = cloneElement(div, {});

  t.deepEqual(clonedDiv.props.className, 'classname');
});

test('cloneElement: should merge the classnames', (t) => {
  const div = <div className="classname1">Hello</div>;
  const clonedDiv = cloneElement(div, { className: 'classname2' });

  t.deepEqual(clonedDiv.props.className, 'classname2 classname1');
});

test('cloneChildren: should clone an array of elements with the passed props', (t) => {
  const clonedChildren = cloneChildren([
    <div key="div" />,
    <span key="span" />,
  ], { className: 'test' });

  t.deepEqual(clonedChildren[0].props.className, 'test');
  t.deepEqual(clonedChildren[1].props.className, 'test');
});

test('cloneChildren: should clone the children and call the function for the props', (t) => {
  const clonedChildren = cloneChildren([
    <div key="div" />,
    <span key="span" />,
  ], () => {
    return { className: 'test' };
  });

  t.deepEqual(clonedChildren[0].props.className, 'test');
  t.deepEqual(clonedChildren[1].props.className, 'test');
});

test('cloneChildren: should only clone children which are valid react elements', (t) => {
  const func = sinon.spy(() => {
    return {};
  });

  cloneChildren([
    <div key="div" />,
    null,
  ], func);

  t.deepEqual(func.callCount, 1);
});
