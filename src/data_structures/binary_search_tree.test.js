import BinarySearchTree from './binary_search_tree';

const dataStructures = [
  BinarySearchTree,
  // We'll add more next week
];

dataStructures.forEach(TargetDS => {
  describe(TargetDS, () => {
    let bst;
    beforeEach(() => {
      bst = new TargetDS();
    });

    it('starts empty', () => {
      expect(bst.count()).toBe(0);
    });

    describe('lookup', () => {
      it('returns undefined on an empty tree', () => {
        expect(bst.lookup('test')).toBe(undefined);
      });

      it('returns undefined if the key is not in the tree', () => {
        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach((key, i) => {
          bst.insert(key);
        });

        expect(bst.lookup('dne')).toBe(undefined);
      });

      it('finds the only record', () => {
        bst.insert('test');
        expect(bst.lookup('test')).toBeTruthy();
      });

      it('finds any extant record', () => {
        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach(key => {
          bst.insert(key);
        });
 
        keys.forEach(key => {
          expect(bst.lookup(key)).toBeTruthy();
        });

        keys.reverse().forEach(key => {
          expect(bst.lookup(key)).toBeTruthy();
        });
      });

      it('returns the value associated with a record', () => {
        const records = [
          { key: 'one', value: 'first' },
          { key: 'two', value: 'second' },
          { key: 'three', value: 'third' },
          { key: 'four', value: 'fourth' },
          { key: 'five', value: 'fifth' },
        ];

        records.forEach(({ key, value }) => {
          bst.insert(key, value);
        });

        records.forEach(({ key, value }) => {
          expect(bst.lookup(key)).toBe(value);
        });

        records.reverse().forEach(({ key, value }) => {
          expect(bst.lookup(key)).toBe(value);
        });
      });
    });

    describe('insert', () => {
      it('increases count by 1', () => {
        expect(bst.count()).toBe(0);
        bst.insert('test');
        expect(bst.count()).toBe(1);

        const keys = ['many', 'keys', 'for', 'this', 'tree'];
        keys.forEach((key, i) => {
          bst.insert(key);
          expect(bst.count()).toBe(2 + i);
        });
      });

      it('replaces records with the same key and does not increase the count', () => {
        bst.insert('test', 'first value');
        expect(bst.count()).toBe(1);
        expect(bst.lookup('test')).toBe('first value');

        bst.insert('test', 'second value');
        expect(bst.count()).toBe(1);
        expect(bst.lookup('test')).toBe('second value');
      });

      it('uses true as the default value', () => {
        bst.insert('test');
        expect(bst.lookup('test')).toBe(true);
      });
    });

    describe('delete', () => {
      beforeEach(() => {
        bst.insert('4', 'four');
        bst.insert('2', 'two');
        bst.insert('1', 'one');
        bst.insert('3', 'three');
        bst.insert('5', 'five');
      });

      it('returns the value for the removed record', () => {
        expect(bst.delete('3')).toBe('three');
      });

      it('returns undefined if the record was not found', () => {
        expect(bst.delete('6')).toBe(undefined);
      });

      it('reduces the count by 1', () => {
        expect(bst.count()).toBe(5);
        bst.delete('2');
        expect(bst.count()).toBe(4);
      });

      it('can remove every element in a tree', () => {
        bst.delete('2');
        bst.delete('3');
        bst.delete('4');
        bst.delete('5');
        bst.delete('1');

        expect(bst.count()).toBe(0);
      });
    });

    describe('scenarios I', () => {
      beforeEach(() => {
        bst.insert(4, 'four');
        bst.insert(2, 'two');
        bst.insert(1, 'one');
        bst.insert(3, 'three');
        bst.insert(5, 'five');
      });

      it('can remove the record with the smallest key', () => {
        bst.delete(1);

        expect(bst.lookup(1)).toBeUndefined;
        expect(bst.lookup(2)).toBe('two');
        expect(bst.lookup(3)).toBe('three');
        expect(bst.lookup(4)).toBe('four');
        expect(bst.lookup(5)).toBe('five');
      });

      it('can remove the record with the largest key', () => {
        bst.delete(5);

        expect(bst.lookup(5)).toBeUndefined;
        expect(bst.lookup(1)).toBe('one');
        expect(bst.lookup(2)).toBe('two');
        expect(bst.lookup(3)).toBe('three');
        expect(bst.lookup(4)).toBe('four');
      });

      it('can remove the root', () => {
        bst.delete(4);

        expect(bst.lookup(4)).toBeUndefined;
        expect(bst.lookup(1)).toBe('one');
        expect(bst.lookup(2)).toBe('two');
        expect(bst.lookup(3)).toBe('three');
        expect(bst.lookup(5)).toBe('five');
        expect(bst._root.key).toBe(5);
      });

      it('can remove a node with no children', () => {
        bst.delete(5);

        expect(bst.lookup(5)).toBeUndefined;
        expect(bst.lookup(1)).toBe('one');
        expect(bst.lookup(2)).toBe('two');
        expect(bst.lookup(3)).toBe('three');
        expect(bst.lookup(4)).toBe('four');
      });

      it('can remove a node with both children, where the successor is the node\'s right child', () => {
        bst.delete(2);

        expect(bst.lookup(2)).toBeUndefined;
        expect(bst.lookup(1)).toBe('one');
        expect(bst.lookup(3)).toBe('three');
        expect(bst.lookup(4)).toBe('four');
        expect(bst.lookup(5)).toBe('five');
        expect(bst._root.left.key).toBe(3);
        expect(bst.findSelf(3).left.key).toBe(1);
      });
    });

    describe('scenarios II', () => {
      beforeEach(() => {
        bst.insert(3, 'three');
        bst.insert(2, 'two');
        bst.insert(1, 'one');
        bst.insert(4, 'four');
        bst.insert(5, 'five');
      });

      it('can remove a node with only a left child', () => {
        bst.delete(2);

        expect(bst.lookup(2)).toBeUndefined;
        expect(bst._root.left.key).toBe(1);
      });

      it('can remove a node with only a right child', () => {
        bst.delete(4);

        expect(bst.lookup(4)).toBeUndefined;
        expect(bst._root.right.key).toBe(5);
      });
    });

    describe('scenarios III', () => {
      beforeEach(() => {
        bst.insert(1, 'one');
        bst.insert(3, 'three');
        bst.insert(2, 'two');
        bst.insert(5, 'five');
        bst.insert(4, 'four');
        bst.insert(6, 'six');
      });

      it('can remove a node with both children, where the successor is not the node\'s right child', () => {
        bst.delete(3);

        expect(bst.lookup(3)).toBeUndefined;
        expect(bst._root.right.key).toBe(4);
        expect(bst.findSelf(5).left).toBeUndefined;
      });
    });

    describe('forEach', () => {
      let records;
      beforeEach(() => {
        records = [
          { key: 'one', value: 'first' },
          { key: 'two', value: 'second' },
          { key: 'three', value: 'third' },
          { key: 'four', value: 'fourth' },
          { key: 'five', value: 'fifth' },
        ];
      });

      const sortRecords = (records) => {
        return records.sort((a, b) => a.key.localeCompare(b.key));
      };

      const fill = (records) => {
        records.forEach(({ key, value }) => {
          bst.insert(key, value);
        });
      };

      it('omits the removed record from iteration results', () => {
        fill(records);
        bst.delete('two');

        const cb = jest.fn();
        bst.forEach(cb);

        const keys = cb.mock.calls.map((call) => { return call[0].key });

        expect(cb.mock.calls.length).toBe(4);
        expect(keys.includes('two')).toBeFalsy;
      });

      it('runs the callback 0 times on an empty tree', () => {
        const cb = jest.fn();
        bst.forEach(cb);

        expect(cb.mock.calls.length).toBe(0);
      });

      it('provides {key, value}, index and tree as cb args', () => {
        bst.insert('key', 'value');

        const cb = jest.fn();
        bst.forEach(cb);

        const callArgs = cb.mock.calls[0];
        expect(callArgs[0].key).toBe('key');
        expect(callArgs[0].value).toBe('value');
        expect(callArgs[1]).toBe(0);
        expect(callArgs[2]).toBe(bst);
      });

      it('iterates records in key order', () => {
        fill(records);

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });

      it('iterates correctly for sorted input', () => {
        fill(sortRecords(records));

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });

      it('iterates correctly for reverse-sorted input', () => {
        fill(sortRecords(records).reverse());

        const cb = jest.fn();
        bst.forEach(cb);

        sortRecords(records).forEach(({ key, value }, i) => {
          const callArgs = cb.mock.calls[i];
          expect(callArgs[0].key).toBe(key);
          expect(callArgs[0].value).toBe(value);
          expect(callArgs[1]).toBe(i);
          expect(callArgs[2]).toBe(bst);
        });
      });
    });
  });
});