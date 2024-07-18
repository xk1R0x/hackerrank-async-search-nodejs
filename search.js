const API = require('./mock-api');
// To count the matches, call API.countMatches(term) where term is the search term
const EventEmitter = require('events');

class Search extends EventEmitter {
  async searchCount(searchTerm) {
    try {    
        searchTerm === undefined ?
            this.emit('SEARCH_ERROR',{
                term: searchTerm,
                message: 'INVALID_TERM'
            }) : this.emit('SEARCH_STARTED', searchTerm)
        
        const count = await API.countMatches(searchTerm);
        this.emit('SEARCH_SUCCESS', {
            count: count, 
            term : searchTerm
        });
    } catch (error) {
        this.emit('SEARCH_ERROR',{
            term: searchTerm,
            message: error.message
        });
    }
  }
}

module.exports = Search;