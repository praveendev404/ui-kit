import { SortArrByKeyPipe } from "./sort.pipe"

describe('sortArrayByFieldAndDir', () => {
    let pipe: SortArrByKeyPipe;
    const arr = [
        {
            name: 'Name 1'
        },
        {
            name: 'Name 3'
        },
        {
            name: 'Name 2'
        }
    ];
    beforeEach(() => {
        pipe = new SortArrByKeyPipe();
    });

    it('should sort ASC', () => {
        expect(pipe.transform(arr, 'name', 'ASC')).toEqual([
            {
                name: 'Name 1'
            },
            {
                name: 'Name 2'
            },
            {
                name: 'Name 3'
            }
        ]);
    });

    it('should sort DESC', () => {
        expect(pipe.transform(arr, 'name', 'DESC')).toEqual([
            {
                name: 'Name 3'
            },
            {
                name: 'Name 2'
            },
            {
                name: 'Name 1'
            }
        ]);
    });

    it('should return initial array in case of empty direction', () => {
        expect(pipe.transform(arr, 'name')).toEqual(arr);
    });
})